# 📖 Tutorial Completo - GitHub Integration

Este tutorial te guiará passo a passo para hospedar sua aplicação RPG Manager no GitHub Pages.

## 🎯 Objetivo
Ao final deste tutorial, você terá:
- Sua aplicação rodando online no GitHub Pages
- Deploy automático a cada atualização
- URL personalizada para compartilhar com seus jogadores

## 📋 Pré-requisitos
- [ ] Conta no GitHub
- [ ] Git instalado no seu computador
- [ ] Node.js 18+ instalado

## 🚀 Passo a Passo

### 1. Preparação do Repositório

#### 1.1 Criar Repositório no GitHub
1. Acesse [GitHub.com](https://github.com)
2. Clique em **"New repository"**
3. Nome sugerido: `rpg-manager` ou `meu-rpg-manager`
4. Marque como **Public** (necessário para GitHub Pages gratuito)
5. Marque **"Add a README file"**
6. Clique **"Create repository"**

#### 1.2 Clonar o Repositório
```bash
# Substitua 'seu-usuario' e 'nome-do-repo' pelos seus dados
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

### 2. Configuração do Projeto

#### 2.1 Copiar os Arquivos
Copie toda a pasta `rpg-ficha-manager` para dentro do seu repositório:

```bash
# Se você tem os arquivos localmente
cp -r /caminho/para/rpg-ficha-manager ./

# Ou baixe os arquivos do projeto e extraia
```

#### 2.2 Configurar o Vite para GitHub Pages
Edite o arquivo `rpg-ficha-manager/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/nome-do-seu-repositorio/', // ⚠️ IMPORTANTE: Substitua aqui
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**⚠️ Atenção**: Substitua `/nome-do-seu-repositorio/` pelo nome real do seu repositório!

#### 2.3 Atualizar package.json
Adicione os scripts de deploy no `rpg-ficha-manager/package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

### 3. Configuração do GitHub Actions

#### 3.1 Criar Pasta de Workflows
```bash
mkdir -p .github/workflows
```

#### 3.2 Criar Arquivo de Deploy
Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy RPG Manager to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: rpg-ficha-manager/package-lock.json
        
    - name: Install dependencies
      run: |
        cd rpg-ficha-manager
        npm ci
        
    - name: Build
      run: |
        cd rpg-ficha-manager
        npm run build
        
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: rpg-ficha-manager/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 4. Configuração do GitHub Pages

#### 4.1 Habilitar GitHub Pages
1. Vá para seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Role para baixo até **Pages**
4. Em **Source**, selecione **"GitHub Actions"**
5. Clique **Save**

#### 4.2 Configurar Permissões
1. Ainda em **Settings**, vá para **Actions** > **General**
2. Em **Workflow permissions**, selecione:
   - ✅ **"Read and write permissions"**
   - ✅ **"Allow GitHub Actions to create and approve pull requests"**
3. Clique **Save**

### 5. Deploy da Aplicação

#### 5.1 Fazer o Primeiro Commit
```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit: RPG Manager application"

# Enviar para o GitHub
git push origin main
```

#### 5.2 Acompanhar o Deploy
1. Vá para a aba **Actions** no seu repositório
2. Você verá o workflow "Deploy RPG Manager to GitHub Pages" executando
3. Aguarde até aparecer ✅ (verde) - pode levar 2-5 minutos

#### 5.3 Acessar sua Aplicação
Após o deploy bem-sucedido:
- URL: `https://seu-usuario.github.io/nome-do-repo/`
- Exemplo: `https://joaosilva.github.io/rpg-manager/`

## 🔧 Configurações Avançadas

### Custom Domain (Domínio Personalizado)
Se você tem um domínio próprio:

1. Crie arquivo `rpg-ficha-manager/public/CNAME`:
```
meudominio.com
```

2. Configure DNS do seu domínio:
```
CNAME: seu-usuario.github.io
```

### Configurar HTTPS
O GitHub Pages automaticamente fornece HTTPS. Para forçar:
1. **Settings** > **Pages**
2. Marque ✅ **"Enforce HTTPS"**

## 🐛 Solução de Problemas Comuns

### ❌ Erro 404 ao acessar a aplicação
**Causa**: Base path incorreto no `vite.config.js`

**Solução**:
```javascript
// Certifique-se que está correto
base: '/nome-exato-do-repositorio/',
```

### ❌ Workflow falha no build
**Causa**: Dependências ou configuração incorreta

**Solução**:
1. Verifique se o `package.json` está na pasta `rpg-ficha-manager/`
2. Execute localmente: `cd rpg-ficha-manager && npm install && npm run build`
3. Se funcionar local, o problema é na configuração do workflow

### ❌ Aplicação carrega mas está "quebrada"
**Causa**: Recursos não encontrados devido ao base path

**Solução**:
1. Verifique o console do navegador (F12)
2. Confirme se o `base` no `vite.config.js` termina com `/`
3. Teste localmente com: `npm run build && npm run preview`

### ❌ GitHub Actions não tem permissão
**Causa**: Permissões insuficientes

**Solução**:
1. **Settings** > **Actions** > **General**
2. Selecione **"Read and write permissions"**
3. Execute o workflow novamente

## 📱 Testando em Dispositivos

### Desktop
- Chrome, Firefox, Safari, Edge
- Resolução mínima: 1024x768

### Mobile
- iOS Safari, Android Chrome
- Funciona offline após primeira visita
- Interface responsiva

## 🔄 Atualizações Futuras

Para atualizar sua aplicação:

1. **Faça as modificações** nos arquivos locais
2. **Teste localmente**:
```bash
cd rpg-ficha-manager
npm run dev
```

3. **Commit e push**:
```bash
git add .
git commit -m "Descrição da atualização"
git push origin main
```

4. **Deploy automático** será executado
5. **Aguarde 2-5 minutos** para ver as mudanças online

## 📊 Monitoramento

### Analytics (Opcional)
Para acompanhar o uso da aplicação, adicione Google Analytics:

1. Crie conta no [Google Analytics](https://analytics.google.com)
2. Adicione o código no `rpg-ficha-manager/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎉 Parabéns!

Sua aplicação RPG Manager está agora:
- ✅ Hospedada no GitHub Pages
- ✅ Com deploy automático
- ✅ Acessível via URL pública
- ✅ Responsiva para mobile
- ✅ Pronta para usar com seus jogadores

## 📞 Precisa de Ajuda?

Se encontrar dificuldades:
1. Verifique os logs em **Actions** no GitHub
2. Consulte a [documentação do GitHub Pages](https://docs.github.com/en/pages)
3. Abra uma issue no repositório do projeto

**Boa sorte com suas aventuras de RPG! 🎲**

