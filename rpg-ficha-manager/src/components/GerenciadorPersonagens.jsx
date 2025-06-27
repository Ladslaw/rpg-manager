import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Plus, Search, Users } from 'lucide-react'
import FichaPersonagem from '../components/FichaPersonagem.jsx'

const GerenciadorPersonagens = () => {
  const [personagens, setPersonagens] = useState([])
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filtro, setFiltro] = useState('')

  // Carregar personagens do localStorage na inicialização
  useEffect(() => {
    const personagensSalvos = localStorage.getItem('rpg-personagens')
    if (personagensSalvos) {
      setPersonagens(JSON.parse(personagensSalvos))
    }
  }, [])

  // Salvar personagens no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('rpg-personagens', JSON.stringify(personagens))
  }, [personagens])

  const criarNovoPersonagem = () => {
    setPersonagemSelecionado(null)
    setIsEditing(true)
  }

  const salvarPersonagem = (dadosPersonagem) => {
    if (personagemSelecionado) {
      // Editando personagem existente
      setPersonagens(prev => prev.map(p => 
        p.id === personagemSelecionado.id 
          ? { ...dadosPersonagem, id: personagemSelecionado.id }
          : p
      ))
      setPersonagemSelecionado({ ...dadosPersonagem, id: personagemSelecionado.id })
    } else {
      // Criando novo personagem
      const novoPersonagem = {
        ...dadosPersonagem,
        id: Date.now().toString()
      }
      setPersonagens(prev => [...prev, novoPersonagem])
      setPersonagemSelecionado(novoPersonagem)
    }
  }

  const excluirPersonagem = (id) => {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      setPersonagens(prev => prev.filter(p => p.id !== id))
      if (personagemSelecionado && personagemSelecionado.id === id) {
        setPersonagemSelecionado(null)
      }
    }
  }

  const selecionarPersonagem = (personagem) => {
    setPersonagemSelecionado(personagem)
    setIsEditing(false)
  }

  const personagensFiltrados = personagens.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    p.classe.toLowerCase().includes(filtro.toLowerCase()) ||
    p.raca.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Personagens */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personagens
                </CardTitle>
                <Button onClick={criarNovoPersonagem} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {personagens.length} personagem{personagens.length !== 1 ? 's' : ''} cadastrado{personagens.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar personagens..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="pl-8"
                  />
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {personagensFiltrados.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {personagens.length === 0 
                          ? 'Nenhum personagem cadastrado'
                          : 'Nenhum personagem encontrado'
                        }
                      </div>
                    ) : (
                      personagensFiltrados.map((personagem) => (
                        <Card
                          key={personagem.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            personagemSelecionado?.id === personagem.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => selecionarPersonagem(personagem)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{personagem.nome}</h3>
                              <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  {personagem.raca}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {personagem.classe}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Nv. {personagem.nivel}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                PV: {personagem.pv.atual}/{personagem.pv.maximo} | 
                                PM: {personagem.pm.atual}/{personagem.pm.maximo}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ficha do Personagem */}
        <div className="lg:col-span-2">
          <FichaPersonagem
            personagem={personagemSelecionado}
            onSave={salvarPersonagem}
            onDelete={excluirPersonagem}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </div>
  )
}

export default GerenciadorPersonagens

