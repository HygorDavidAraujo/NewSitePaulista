# Pizzaria Paulista — Site

Site institucional e cardápio da Pizzaria Paulista.

## Estrutura

- `index.html`: Home com CTA para Delivery e mosaico de fotos
- `sobre.html`: Página institucional com acordeão
- `cardapio.html`: Cardápio completo com categorias e rolagem por seção
- `contato.html`: Mapa + formulário com backend `enviar-email.php`
- `css/style.css`: Estilos globais e componentes
- `js/main.js`: Interações (menu, horários, accordions, etc.)
- `images/`: Logos e imagens do site

## Publicar no GitHub Pages

Há duas formas. Use o **GitHub CLI (gh)** ou faça pelo site.

### Opção A — Via GitHub CLI

1. Instalar o GitHub CLI (Windows):
   - https://cli.github.com/
2. Autenticar:
   ```powershell
   gh auth login
   ```
3. Criar o repositório público (substitua `pizzaria-paulista-site` se quiser outro nome):
   ```powershell
   cd "c:\Users\hygor\Documentos\Pizzaria Paulista\NewSitePaulista"
   git init
   git add .
   git commit -m "feat: site inicial"
   gh repo create pizzaria-paulista-site --public --source . --remote origin --push
   ```
4. Ativar o GitHub Pages (branch `main`, raiz `/`):
   ```powershell
   # Substitua <owner> pelo seu usuário
   gh api -X POST repos/<owner>/pizzaria-paulista-site/pages -F source[branch]=main -F source[path]=/
   ```
5. URL do site: `https://<owner>.github.io/pizzaria-paulista-site/`

### Opção B — Via Site do GitHub

1. Crie um repositório público chamado `pizzaria-paulista-site`.
2. No seu PC:
   ```powershell
   cd "c:\Users\hygor\Documentos\Pizzaria Paulista\NewSitePaulista"
   git init
   git add .
   git commit -m "feat: site inicial"
   git branch -M main
   git remote add origin https://github.com/<owner>/pizzaria-paulista-site.git
   git push -u origin main
   ```
3. No GitHub (Settings → Pages):
   - **Source:** Deploy from a branch
   - **Branch:** `main` / **Folder:** `/` (root)
   - Salve. Aguarde a publicação.

## Configurar domínio próprio (opcional)

- Crie um arquivo `CNAME` na raiz com o domínio: `pizzariapaulista.com.br`
- Aponte o DNS para GitHub Pages conforme documentação: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Contato

- Telefone: (62) 3922-2167
- Endereço: Av. D, nº 616, Setor Oeste, Goiânia-GO
