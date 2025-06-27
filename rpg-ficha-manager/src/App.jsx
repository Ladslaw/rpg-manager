import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Users, UserPlus, Sword, BookOpen, Home } from 'lucide-react'
import GerenciadorPersonagens from './components/GerenciadorPersonagens.jsx'
import GerenciadorNPCs from './components/GerenciadorNPCs.jsx'
import GerenciadorCampanhas from './components/GerenciadorCampanhas.jsx'
import './App.css'

// Componente da página inicial
const HomePage = () => (
  <div className="container mx-auto p-6">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">Gerenciador de Fichas RPG</h1>
      <p className="text-xl text-muted-foreground">Tormenta 20 & D&D 5e</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Personagens
          </CardTitle>
          <CardDescription>
            Gerencie fichas de personagens dos jogadores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/personagens">
            <Button className="w-full">Acessar Personagens</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            NPCs
          </CardTitle>
          <CardDescription>
            Crie e gerencie NPCs para suas aventuras
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/npcs">
            <Button className="w-full">Gerenciar NPCs</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Campanhas
          </CardTitle>
          <CardDescription>
            Organize suas campanhas e sessões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/campanhas">
            <Button className="w-full">Ver Campanhas</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sword className="h-5 w-5" />
            Combate
          </CardTitle>
          <CardDescription>
            Controle iniciativa e turnos de combate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/combate">
            <Button className="w-full">Iniciar Combate</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Página temporária (será desenvolvida na próxima fase)
const CombatePage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Controle de Combate</h1>
    <p>Página de controle de combate (em desenvolvimento)</p>
  </div>
)

// Componente de navegação
const Navigation = () => (
  <nav className="bg-card border-b border-border">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Home className="h-6 w-6" />
          RPG Manager
        </Link>
        <div className="flex gap-4">
          <Link to="/personagens">
            <Button variant="ghost">Personagens</Button>
          </Link>
          <Link to="/npcs">
            <Button variant="ghost">NPCs</Button>
          </Link>
          <Link to="/campanhas">
            <Button variant="ghost">Campanhas</Button>
          </Link>
          <Link to="/combate">
            <Button variant="ghost">Combate</Button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personagens" element={<GerenciadorPersonagens />} />
          <Route path="/npcs" element={<GerenciadorNPCs />} />
          <Route path="/campanhas" element={<GerenciadorCampanhas />} />
          <Route path="/combate" element={<CombatePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

