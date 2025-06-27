# 🎲 RPG Manager - Tormenta 20 & D&D 5e

Uma aplicação web completa para gerenciar fichas de personagens, NPCs e campanhas de RPG, especialmente otimizada para Tormenta 20 com elementos de D&D 5e.

![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Compatible-green?style=flat&logo=github&logoColor=white)

## ✨ Funcionalidades

### 🧙‍♂️ Gerenciamento de Personagens
- **Fichas Completas**: Todos os atributos de Tormenta 20/D&D 5e
- **Cálculo Automático**: Modificadores de atributos calculados automaticamente
- **Organização por Abas**: Básico, Atributos, Perícias, Equipamentos, Magias
- **Armazenamento Local**: Dados salvos no navegador (localStorage)
- **Interface Responsiva**: Funciona em desktop e mobile

### 👥 Sistema de NPCs
- **Criação Rápida**: Interface otimizada para mestres
- **Tipos Organizados**: Aliado, Inimigo, Neutro, Comerciante, etc.
- **Nível de Desafio**: Sistema de classificação para combates
- **Informações de Roleplay**: Aparência, personalidade, motivações
- **Filtros Inteligentes**: Busca por nome e tipo

### 📚 Gerenciamento de Campanhas
- **Organização Completa**: Informações gerais, participantes, sessões
- **Integração Total**: Associe personagens e NPCs às campanhas
- **Controle de Sessões**: Numeração automática e resumos
- **Anotações do Mestre**: Campo privado para planejamento
- **Status de Campanha**: Planejamento, Em Andamento, Pausada, Concluída

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ instalado
- Git instalado
- Conta no GitHub

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/rpg-manager.git
cd rpg-manager/rpg-ficha-manager
```

2. **Instale as dependências**
```bash
npm install
# ou
pnpm install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
pnpm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🌐 Deploy no GitHub Pages

### Método Automático (Recomendado)

1. **Fork este repositório** ou **crie um novo repositório** no GitHub

2. **Configure o GitHub Pages**
   - Vá em `Settings` > `Pages`
   - Em `Source`, selecione `GitHub Actions`

3. **Crie o arquivo de workflow**
   
   Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
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
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: rpg-ficha-manager/dist
```

4. **Configure o base path**
   
   Edite o arquivo `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/nome-do-seu-repositorio/', // Substitua pelo nome do seu repo
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

5. **Faça o commit e push**
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

6. **Aguarde o deploy**
   - Vá em `Actions` no GitHub para acompanhar o processo
   - Após concluído, acesse: `https://seu-usuario.github.io/nome-do-repo`

### Método Manual

1. **Build do projeto**
```bash
cd rpg-ficha-manager
npm run build
```

2. **Deploy manual**
```bash
npm run deploy
```

## 📁 Estrutura do Projeto

```
rpg-manager/
├── rpg-ficha-manager/          # Aplicação React principal
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── FichaPersonagem.jsx
│   │   │   ├── GerenciadorPersonagens.jsx
│   │   │   ├── FichaNPC.jsx
│   │   │   ├── GerenciadorNPCs.jsx
│   │   │   ├── FichaCampanha.jsx
│   │   │   └── GerenciadorCampanhas.jsx
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Ponto de entrada
│   ├── public/                 # Arquivos estáticos
│   ├── package.json            # Dependências
│   └── vite.config.js          # Configuração do Vite
├── README.md                   # Este arquivo
└── TUTORIAL.md                 # Tutorial detalhado
```

## 🎮 Como Usar a Aplicação

### Criando Personagens
1. Acesse a aba **Personagens**
2. Clique no botão **+** para criar novo
3. Preencha as informações básicas (nome, raça, classe)
4. Configure os atributos nas abas organizadas
5. Salve e gerencie suas fichas

### Gerenciando NPCs
1. Vá para a aba **NPCs**
2. Crie NPCs com informações essenciais para o mestre
3. Organize por tipo (Aliado, Inimigo, etc.)
4. Use os filtros para encontrar rapidamente

### Organizando Campanhas
1. Acesse **Campanhas**
2. Crie uma nova campanha com descrição e objetivos
3. Associe personagens e NPCs relevantes
4. Acompanhe o progresso das sessões
5. Mantenha anotações privadas do mestre

## 🔧 Personalização

### Modificando Raças e Classes
Edite os arrays em `src/components/FichaPersonagem.jsx`:

```javascript
const racas = [
  'Humano', 'Elfo', 'Anão', 'Halfling', 'Qareen', 'Golem',
  // Adicione suas raças personalizadas
]

const classes = [
  'Arcanista', 'Bárbaro', 'Bardo', 'Bucaneiro', 'Caçador',
  // Adicione suas classes personalizadas
]
```

### Adicionando Novos Tipos de NPC
Modifique o array em `src/components/FichaNPC.jsx`:

```javascript
const tiposNPC = [
  'Aliado', 'Neutro', 'Inimigo', 'Comerciante',
  // Adicione novos tipos
]
```

## 🐛 Solução de Problemas

### A aplicação não carrega no GitHub Pages
- Verifique se o `base` no `vite.config.js` está correto
- Confirme se o workflow do GitHub Actions foi executado com sucesso
- Aguarde alguns minutos para propagação do DNS

### Dados não estão sendo salvos
- Os dados são salvos no localStorage do navegador
- Limpar o cache/dados do navegador apagará as informações
- Para backup, exporte os dados manualmente

### Erro de build
- Verifique se todas as dependências estão instaladas
- Execute `npm ci` para instalação limpa
- Confirme a versão do Node.js (18+)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🎯 Roadmap

- [ ] Sistema de combate com iniciativa
- [ ] Rolagem de dados integrada
- [ ] Exportação de fichas em PDF
- [ ] Sistema de backup/sincronização
- [ ] Modo escuro
- [ ] Suporte a outros sistemas de RPG

## 📞 Suporte

Se encontrar problemas ou tiver sugestões:
- Abra uma [Issue](https://github.com/seu-usuario/rpg-manager/issues)
- Entre em contato via [email](mailto:seu-email@exemplo.com)

---

**Desenvolvido com ❤️ para a comunidade de RPG**

