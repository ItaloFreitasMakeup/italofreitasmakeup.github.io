import { deflateSync, inflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const sourcePath = new URL("../client/src/lib/logo.png", import.meta.url);
const outputPath = new URL("../client/public/favicon.png", import.meta.url);
const source = readFileSync(sourcePath);

const signature = source.subarray(0, 8);
let offset = 8;
let width;
let height;
const idat = [];

while (offset < source.length) {
  const length = source.readUInt32BE(offset);
  const type = source.toString("ascii", offset + 4, offset + 8);
  const data = source.subarray(offset + 8, offset + 8 + length);

  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    if (data[8] !== 8 || data[9] !== 6 || data[12] !== 0) {
      throw new Error("Expected non-interlaced 8-bit RGBA PNG");
    }
  } else if (type === "IDAT") {
    idat.push(data);
  }

  offset += length + 12;
}

const bytesPerPixel = 4;
const scanlineLength = width * bytesPerPixel;
const filtered = inflateSync(Buffer.concat(idat));
const pixels = Buffer.alloc(width * height * bytesPerPixel);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

for (let y = 0; y < height; y += 1) {
  const filter = filtered[y * (scanlineLength + 1)];
  const rowStart = y * scanlineLength;
  const inputStart = y * (scanlineLength + 1) + 1;

  for (let x = 0; x < scanlineLength; x += 1) {
    const raw = filtered[inputStart + x];
    const left = x >= bytesPerPixel ? pixels[rowStart + x - bytesPerPixel] : 0;
    const up = y > 0 ? pixels[rowStart + x - scanlineLength] : 0;
    const upLeft = y > 0 && x >= bytesPerPixel
      ? pixels[rowStart + x - scanlineLength - bytesPerPixel]
      : 0;
    const predictor = [0, left, up, Math.floor((left + up) / 2), paeth(left, up, upLeft)][filter];
    pixels[rowStart + x] = (raw + predictor) & 0xff;
  }
}

const size = Math.max(width, height);
const leftPadding = Math.floor((size - width) / 2);
const topPadding = Math.floor((size - height) / 2);
const square = Buffer.alloc(height * (size * bytesPerPixel + 1));

for (let y = 0; y < height; y += 1) {
  const outputRow = (y + topPadding) * (size * bytesPerPixel + 1);
  pixels.copy(square, outputRow + 1 + leftPadding * bytesPerPixel, y * scanlineLength, (y + 1) * scanlineLength);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const result = Buffer.alloc(data.length + 12);
  result.writeUInt32BE(data.length, 0);
  typeBuffer.copy(result, 4);
  data.copy(result, 8);
  result.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), data.length + 8);
  return result;
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(size, 0);
ihdr.writeUInt32BE(size, 4);
ihdr.set([8, 6, 0, 0, 0], 8);

writeFileSync(outputPath, Buffer.concat([
  signature,
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(square, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]));

console.log(`Created ${size}x${size} favicon at ${outputPath.pathname}`);
