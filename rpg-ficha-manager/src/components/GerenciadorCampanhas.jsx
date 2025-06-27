import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Plus, Search, BookOpen, Filter, Calendar, Users } from 'lucide-react'
import FichaCampanha from '../components/FichaCampanha.jsx'

const GerenciadorCampanhas = () => {
  const [campanhas, setCampanhas] = useState([])
  const [personagens, setPersonagens] = useState([])
  const [npcs, setNpcs] = useState([])
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const statusCampanha = [
    'Planejamento', 'Em Andamento', 'Pausada', 'Concluída', 'Cancelada'
  ]

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const campanhasSalvas = localStorage.getItem('rpg-campanhas')
    if (campanhasSalvas) {
      setCampanhas(JSON.parse(campanhasSalvas))
    }

    const personagensSalvos = localStorage.getItem('rpg-personagens')
    if (personagensSalvos) {
      setPersonagens(JSON.parse(personagensSalvos))
    }

    const npcsSalvos = localStorage.getItem('rpg-npcs')
    if (npcsSalvos) {
      setNpcs(JSON.parse(npcsSalvos))
    }
  }, [])

  // Salvar campanhas no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('rpg-campanhas', JSON.stringify(campanhas))
  }, [campanhas])

  const criarNovaCampanha = () => {
    setCampanhaSelecionada(null)
    setIsEditing(true)
  }

  const salvarCampanha = (dadosCampanha) => {
    if (campanhaSelecionada) {
      // Editando campanha existente
      setCampanhas(prev => prev.map(c => 
        c.id === campanhaSelecionada.id 
          ? { ...dadosCampanha, id: campanhaSelecionada.id }
          : c
      ))
      setCampanhaSelecionada({ ...dadosCampanha, id: campanhaSelecionada.id })
    } else {
      // Criando nova campanha
      const novaCampanha = {
        ...dadosCampanha,
        id: Date.now().toString()
      }
      setCampanhas(prev => [...prev, novaCampanha])
      setCampanhaSelecionada(novaCampanha)
    }
  }

  const excluirCampanha = (id) => {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      setCampanhas(prev => prev.filter(c => c.id !== id))
      if (campanhaSelecionada && campanhaSelecionada.id === id) {
        setCampanhaSelecionada(null)
      }
    }
  }

  const selecionarCampanha = (campanha) => {
    setCampanhaSelecionada(campanha)
    setIsEditing(false)
  }

  const campanhasFiltradas = campanhas.filter(c => {
    const matchNome = c.nome.toLowerCase().includes(filtro.toLowerCase())
    const matchStatus = filtroStatus === 'todos' || c.status === filtroStatus
    return matchNome && matchStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em Andamento':
        return 'default'
      case 'Concluída':
        return 'secondary'
      case 'Pausada':
        return 'outline'
      case 'Cancelada':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const contarPorStatus = (status) => {
    return campanhas.filter(c => c.status === status).length
  }

  const getPersonagemNome = (id) => {
    const personagem = personagens.find(p => p.id === id)
    return personagem ? personagem.nome : 'Desconhecido'
  }

  const getNPCNome = (id) => {
    const npc = npcs.find(n => n.id === id)
    return npc ? npc.nome : 'Desconhecido'
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Campanhas */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Campanhas
                </CardTitle>
                <Button onClick={criarNovaCampanha} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {campanhas.length} campanha{campanhas.length !== 1 ? 's' : ''} cadastrada{campanhas.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filtros */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar campanhas..."
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  
                  <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os status</SelectItem>
                      {statusCampanha.map(status => (
                        <SelectItem key={status} value={status}>
                          {status} ({contarPorStatus(status)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estatísticas rápidas */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ativas:</span>
                    <Badge variant="default" className="text-xs">
                      {contarPorStatus('Em Andamento')}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Concluídas:</span>
                    <Badge variant="secondary" className="text-xs">
                      {contarPorStatus('Concluída')}
                    </Badge>
                  </div>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {campanhasFiltradas.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {campanhas.length === 0 
                          ? 'Nenhuma campanha cadastrada'
                          : 'Nenhuma campanha encontrada'
                        }
                      </div>
                    ) : (
                      campanhasFiltradas.map((campanha) => (
                        <Card
                          key={campanha.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            campanhaSelecionada?.id === campanha.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => selecionarCampanha(campanha)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{campanha.nome}</h3>
                              <div className="flex flex-wrap gap-1">
                                <Badge variant={getStatusColor(campanha.status)} className="text-xs">
                                  {campanha.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Sessão {campanha.sessaoAtual}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {campanha.personagensIds?.length || 0} jogadores
                                </div>
                                {campanha.localizacaoAtual && (
                                  <div className="text-xs">📍 {campanha.localizacaoAtual}</div>
                                )}
                              </div>
                              {campanha.descricao && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {campanha.descricao}
                                </p>
                              )}
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

        {/* Ficha da Campanha */}
        <div className="lg:col-span-2">
          <FichaCampanha
            campanha={campanhaSelecionada}
            onSave={salvarCampanha}
            onDelete={excluirCampanha}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            personagens={personagens}
            npcs={npcs}
          />
        </div>
      </div>
    </div>
  )
}

export default GerenciadorCampanhas

