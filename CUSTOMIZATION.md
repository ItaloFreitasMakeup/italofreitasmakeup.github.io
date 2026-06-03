# Guia de Customização - Italo Freitas Makeup

Este guia fornece instruções para customizar o site de acordo com suas necessidades específicas.

## Estrutura do Projeto

```
client/
├── src/
│   ├── pages/
│   │   └── Home.tsx          # Página principal (edite aqui!)
│   ├── components/           # Componentes reutilizáveis
│   ├── index.css             # Estilos globais e tema
│   └── App.tsx               # Configuração da aplicação
├── index.html                # HTML principal
└── public/                   # Arquivos estáticos
```

## Customizações Principais

### 1. Informações Básicas

Edite `client/src/pages/Home.tsx`:

```tsx
// Altere o nome
<h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
  Seu Nome Aqui
</h1>

// Altere a profissão
<p className="text-xl md:text-2xl text-warm-gray mb-4">
  Sua Profissão Aqui
</p>

// Altere a descrição
<p className="text-lg text-gray-600 mb-8 leading-relaxed">
  Sua descrição profissional aqui
</p>
```

### 2. Localização e Contato

Atualize a seção de localização:

```tsx
<p className="text-gray-600 mb-2">Sua Rua, 123</p>
<p className="text-gray-600 mb-2">Seu Bairro, Sua Cidade - Estado</p>
<p className="text-gray-600">CEP: 00000-000</p>

// Links de contato
<a href="https://wa.me/5511999999999" target="_blank">
  WhatsApp
</a>
<a href="https://instagram.com/seu-usuario" target="_blank">
  Instagram
</a>
```

### 3. Adicionar Fotos e Vídeos

#### Foto de Perfil

Substitua o placeholder:

```tsx
<div className="bg-light-gray rounded-lg h-96 flex items-center justify-center">
  <img 
    src="/caminho/para/sua/foto.jpg" 
    alt="Foto de Perfil"
    className="w-full h-full object-cover rounded-lg"
  />
</div>
```

#### Portfólio

Adicione suas fotos e GIFs:

```tsx
{[1, 2, 3, 4, 5, 6].map((item) => (
  <div key={item} className="bg-gray-200 rounded-lg h-64 flex items-center justify-center hover:shadow-lg transition-shadow">
    <img 
      src={`/portfolio/trabalho-${item}.jpg`} 
      alt={`Trabalho ${item}`}
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
))}
```

#### Eventos

Adicione fotos e descrições dos eventos:

```tsx
<div className="card-elegant">
  <img 
    src="/eventos/evento-1.jpg" 
    alt="Evento 1"
    className="w-full h-48 object-cover rounded-lg mb-4"
  />
  <h3 className="text-xl font-bold mb-2">Nome do Evento</h3>
  <p className="text-gray-600 mb-4">Descrição do evento</p>
  <p className="text-sm text-warm-gray">Data: 15/06/2024</p>
</div>
```

### 4. Cursos Ministrados

Customize os cursos oferecidos:

```tsx
{
  title: "Seu Curso",
  description: "Descrição do curso",
  price: "R$ 299,00",
  content: "Conteúdo do curso"
}
```

### 5. Cursos Realizados

Adicione seus certificados:

```tsx
{
  title: "Nome do Curso",
  institution: "Nome da Instituição",
  year: "2024",
  certificateUrl: "https://link-para-certificado.com"
}
```

### 6. Tema de Cores

Edite `client/src/index.css` para alterar as cores:

```css
:root {
  /* Cores customizadas */
  --gold: #D4AF37;              /* Cor principal (dourado) */
  --gold-light: #E8C547;        /* Dourado claro */
  --gold-dark: #B8941F;         /* Dourado escuro */
  --black: #1A1A1A;             /* Preto */
  --white: #FFFFFF;             /* Branco */
  --warm-gray: #8B8B7A;         /* Cinza quente */
  --light-gray: #F5F5F5;        /* Cinza claro */
  --marble-gray: #D3D3D0;       /* Cinza mármore */
}
```

### 7. Tipografia

As fontes estão configuradas em `client/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
```

Para alterar as fontes:
1. Acesse [Google Fonts](https://fonts.google.com)
2. Selecione as fontes desejadas
3. Copie o link e substitua em `client/index.html`
4. Atualize as referências em `client/src/index.css`:

```css
body {
  font-family: 'Sua Nova Fonte', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Sua Fonte Display', serif;
}
```

### 8. Adicionar Novas Seções

Para adicionar uma nova seção, edite `client/src/pages/Home.tsx`:

```tsx
{/* Nova Seção */}
<section id="nova-secao" className="section-spacing">
  <div className="container">
    <h2 className="section-title-gold">Título da Seção</h2>
    {/* Conteúdo aqui */}
  </div>
</section>

{/* Divider */}
<div className="gold-divider"></div>
```

Não esqueça de adicionar o link na navegação:

```tsx
<a href="#nova-secao" className="text-sm hover:text-gold transition-colors">
  Nova Seção
</a>
```

### 9. Formulário de Contato

O formulário atual é um placeholder. Para funcionalidade real, você pode:

#### Opção A: Usar um serviço como Formspree

1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta e um formulário
3. Atualize o atributo `action` do formulário:

```tsx
<form action="https://formspree.io/f/seu-id" method="POST" className="space-y-4">
  {/* campos do formulário */}
</form>
```

#### Opção B: Usar um backend próprio

Se você tiver um backend, configure o formulário para enviar dados:

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  {/* campos do formulário */}
</form>
```

### 10. Favicon

Substitua o favicon em `client/public/favicon.ico` com seu próprio favicon.

## Desenvolvimento Local

### Instalar dependências
```bash
pnpm install
```

### Iniciar servidor de desenvolvimento
```bash
pnpm run dev
```

O site estará disponível em `http://localhost:3000`

### Compilar para produção
```bash
pnpm run build
```

## Dicas de Design

### Manter a Elegância
- Use espaçamento generoso entre seções
- Mantenha a paleta de cores consistente
- Use a tipografia Playfair Display para títulos importantes

### Otimizar Imagens
- Comprima imagens antes de fazer upload
- Use formatos modernos (WebP, AVIF)
- Mantenha proporções consistentes

### Responsividade
- Teste o site em dispositivos móveis
- Use as classes Tailwind responsivas (md:, lg:, etc.)
- Verifique a legibilidade em telas pequenas

## Troubleshooting

### Estilos não aparecem
- Limpe o cache: `pnpm run dev` e recarregue a página
- Verifique se os arquivos CSS foram salvos

### Imagens não carregam
- Verifique o caminho das imagens
- Certifique-se de que os arquivos existem
- Use caminhos relativos corretos

### Mudanças não aparecem
- Recarregue a página (Ctrl+R)
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Reinicie o servidor de desenvolvimento

## Recursos Adicionais

- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação React](https://react.dev/)
- [Documentação Vite](https://vitejs.dev/)
- [Google Fonts](https://fonts.google.com)

## Suporte

Para dúvidas ou problemas, consulte a documentação oficial das tecnologias utilizadas ou entre em contato com o desenvolvedor.
