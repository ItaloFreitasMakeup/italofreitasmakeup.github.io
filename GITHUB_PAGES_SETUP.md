# Configuração para GitHub Pages

Este documento fornece instruções para hospedar o site do Italo Freitas Makeup no GitHub Pages.

## Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js e pnpm instalados

## Passos para Deploy

### 1. Criar um repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository" (Novo repositório)
3. Nomeie o repositório como `italo-freitas-makeup` (ou outro nome de sua preferência)
4. Deixe como "Public" (Público)
5. Clique em "Create repository"

### 2. Clonar o projeto localmente

```bash
git clone https://github.com/seu-usuario/italo-freitas-makeup.git
cd italo-freitas-makeup
```

### 3. Adicionar os arquivos do projeto

Copie todos os arquivos do projeto para o repositório clonado:

```bash
cp -r /home/ubuntu/italo-freitas-makeup/* .
```

### 4. Instalar dependências

```bash
pnpm install
```

### 5. Compilar o projeto

```bash
pnpm run build
```

### 6. Configurar GitHub Pages

#### Opção A: Deploy automático com GitHub Actions (Recomendado)

1. Crie um arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
          cname: seu-dominio.com  # Opcional: se usar domínio customizado
```

2. Faça commit e push:

```bash
git add .
git commit -m "Initial commit with GitHub Pages setup"
git push origin main
```

3. Acesse as configurações do repositório → Settings → Pages
4. Selecione "Deploy from a branch"
5. Escolha "gh-pages" como branch
6. Salve as configurações

#### Opção B: Deploy manual

1. Compile o projeto:
```bash
pnpm run build
```

2. Crie uma branch `gh-pages`:
```bash
git checkout --orphan gh-pages
git rm -rf .
```

3. Copie os arquivos compilados:
```bash
cp -r dist/public/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

4. Acesse as configurações do repositório → Settings → Pages
5. Selecione "Deploy from a branch" e escolha "gh-pages"

### 7. Acessar o site

Seu site estará disponível em:
- `https://seu-usuario.github.io/italo-freitas-makeup/`

Ou se usar domínio customizado:
- `https://seu-dominio.com`

## Atualizar o site

Para fazer atualizações:

1. Edite os arquivos do projeto
2. Compile: `pnpm run build`
3. Faça commit e push:
```bash
git add .
git commit -m "Update site content"
git push origin main
```

O GitHub Actions automaticamente compilará e fará deploy das mudanças.

## Domínio Customizado (Opcional)

Para usar um domínio customizado:

1. Registre um domínio em um registrador (ex: GoDaddy, Namecheap)
2. Configure os DNS records apontando para GitHub Pages
3. Adicione o domínio em Settings → Pages → Custom domain
4. Atualize o arquivo `CNAME` no repositório com seu domínio

## Troubleshooting

### Site não aparece após push

- Aguarde 1-2 minutos para o GitHub Actions processar
- Verifique a aba "Actions" no repositório para ver se houve erros
- Verifique se a branch `gh-pages` foi criada em Settings → Pages

### Estilos não carregam corretamente

- Verifique se o `base` URL está configurado corretamente em `vite.config.ts`
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Imagens não aparecem

- Certifique-se de que as imagens estão no diretório correto
- Use caminhos relativos para as imagens

## Recursos Adicionais

- [Documentação GitHub Pages](https://docs.github.com/pt/pages)
- [Documentação Vite](https://vitejs.dev/)
- [Documentação React](https://react.dev/)
