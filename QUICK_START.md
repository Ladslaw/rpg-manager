# 🚀 Guia Rápido - RPG Manager

## ⚡ Início Rápido (5 minutos)

### 1. Preparação
```bash
# Clone ou baixe os arquivos do projeto
# Certifique-se de ter Node.js 18+ instalado
```

### 2. Configuração Básica
1. **Crie um repositório no GitHub**
   - Nome sugerido: `rpg-manager`
   - Marque como público

2. **Edite o arquivo `vite.config.js`**
   ```javascript
   base: '/nome-do-seu-repositorio/', // ⚠️ Substitua aqui
   ```

3. **Copie os arquivos para seu repositório**

### 3. Deploy Automático
```bash
# Faça o commit inicial
git add .
git commit -m "Initial RPG Manager setup"
git push origin main
```

### 4. Configurar GitHub Pages
1. Vá em **Settings** > **Pages**
2. Selecione **"GitHub Actions"** como source
3. Aguarde o deploy (2-5 minutos)

### 5. Acessar Aplicação
- URL: `https://seu-usuario.github.io/nome-do-repo/`

## 🎯 Funcionalidades Principais

### Personagens
- Fichas completas de Tormenta 20/D&D 5e
- Cálculo automático de modificadores
- Organização por abas

### NPCs
- Criação rápida para mestres
- Tipos organizados (Aliado, Inimigo, etc.)
- Sistema de nível de desafio

### Campanhas
- Gerenciamento completo de aventuras
- Integração com personagens e NPCs
- Controle de sessões e anotações

## 🔧 Comandos Úteis

```bash
# Desenvolvimento local
cd rpg-ficha-manager
npm install
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Deploy manual (se necessário)
npm run deploy
```

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Funciona offline após primeira visita
- ✅ Interface responsiva

## 🆘 Problemas Comuns

### Erro 404
- Verifique o `base` no `vite.config.js`
- Deve ser: `/nome-exato-do-repositorio/`

### Build falha
- Confirme Node.js 18+
- Execute `npm ci` para instalação limpa

### Aplicação "quebrada"
- Verifique console do navegador (F12)
- Teste localmente primeiro

## 📞 Suporte

- 📖 **Tutorial completo**: `TUTORIAL.md`
- 📋 **Documentação**: `README.md`
- 🐛 **Issues**: GitHub Issues do projeto

---

**Pronto para suas aventuras de RPG! 🎲**

