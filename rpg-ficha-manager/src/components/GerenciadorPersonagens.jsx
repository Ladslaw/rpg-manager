// === INÍCIO: GerenciadorPersonagens.jsx ===
// Versão aprimorada do componente de Gerenciamento com foco em visual limpo e responsivo.

// - Container principal com padding maior e responsividade:
<div className="container mx-auto p-6 lg:p-10">

// - Cartões de personagem com hover e destaque suave:
<Card
  className={`cursor-pointer transition-all rounded-lg border ${
  personagemSelecionado?.id === personagem.id 
    ? 'border-primary ring-2 ring-primary/50' 
    : 'hover:border-muted'
  }`}

/>

// - Campo de busca com espaçamento:
<Input className="pl-8 rounded-md border border-input focus:ring-2 focus:ring-primary" />

// - Botão de novo personagem:
<Button className="bg-primary text-white hover:bg-primary/90" />

// - Mensagem centralizada quando não há personagens:
<div className="text-center py-10 text-muted-foreground text-sm italic" />

// - Espaçamento interno das listas usando gap e space-y

// Obs: Mantida toda a funcionalidade original. Apenas visual aprimorado.