import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Plus, Search, UserPlus, Filter } from 'lucide-react'
import FichaNPC from '../components/FichaNPC.jsx'

const GerenciadorNPCs = () => {
  const [npcs, setNpcs] = useState([])
  const [npcSelecionado, setNpcSelecionado] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filtro, setFiltro] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')

  const tiposNPC = [
    'Aliado', 'Neutro', 'Inimigo', 'Comerciante', 'Autoridade', 'Informante', 
    'Guarda', 'Criminoso', 'Nobre', 'Plebeu', 'Monstro', 'Animal'
  ]

  // Carregar NPCs do localStorage na inicialização
  useEffect(() => {
    const npcsSalvos = localStorage.getItem('rpg-npcs')
    if (npcsSalvos) {
      setNpcs(JSON.parse(npcsSalvos))
    }
  }, [])

  // Salvar NPCs no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('rpg-npcs', JSON.stringify(npcs))
  }, [npcs])

  const criarNovoNPC = () => {
    setNpcSelecionado(null)
    setIsEditing(true)
  }

  const salvarNPC = (dadosNPC) => {
    if (npcSelecionado) {
      // Editando NPC existente
      setNpcs(prev => prev.map(n => 
        n.id === npcSelecionado.id 
          ? { ...dadosNPC, id: npcSelecionado.id }
          : n
      ))
      setNpcSelecionado({ ...dadosNPC, id: npcSelecionado.id })
    } else {
      // Criando novo NPC
      const novoNPC = {
        ...dadosNPC,
        id: Date.now().toString()
      }
      setNpcs(prev => [...prev, novoNPC])
      setNpcSelecionado(novoNPC)
    }
  }

  const excluirNPC = (id) => {
    if (confirm('Tem certeza que deseja excluir este NPC?')) {
      setNpcs(prev => prev.filter(n => n.id !== id))
      if (npcSelecionado && npcSelecionado.id === id) {
        setNpcSelecionado(null)
      }
    }
  }

  const selecionarNPC = (npc) => {
    setNpcSelecionado(npc)
    setIsEditing(false)
  }

  const npcsFiltrados = npcs.filter(n => {
    const matchNome = n.nome.toLowerCase().includes(filtro.toLowerCase())
    const matchTipo = filtroTipo === 'todos' || n.tipo === filtroTipo
    return matchNome && matchTipo
  })

  const getCorTipo = (tipo) => {
    switch (tipo) {
      case 'Aliado':
        return 'default'
      case 'Inimigo':
        return 'destructive'
      case 'Neutro':
        return 'secondary'
      case 'Comerciante':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const contarPorTipo = (tipo) => {
    return npcs.filter(n => n.tipo === tipo).length
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de NPCs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  NPCs
                </CardTitle>
                <Button onClick={criarNovoNPC} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {npcs.length} NPC{npcs.length !== 1 ? 's' : ''} cadastrado{npcs.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filtros */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar NPCs..."
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os tipos</SelectItem>
                      {tiposNPC.map(tipo => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo} ({contarPorTipo(tipo)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estatísticas rápidas */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Aliados:</span>
                    <Badge variant="default" className="text-xs">
                      {contarPorTipo('Aliado')}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Inimigos:</span>
                    <Badge variant="destructive" className="text-xs">
                      {contarPorTipo('Inimigo')}
                    </Badge>
                  </div>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {npcsFiltrados.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        {npcs.length === 0 
                          ? 'Nenhum NPC cadastrado'
                          : 'Nenhum NPC encontrado'
                        }
                      </div>
                    ) : (
                      npcsFiltrados.map((npc) => (
                        <Card
                          key={npc.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            npcSelecionado?.id === npc.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => selecionarNPC(npc)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{npc.nome}</h3>
                              <div className="flex flex-wrap gap-1">
                                <Badge variant={getCorTipo(npc.tipo)} className="text-xs">
                                  {npc.tipo}
                                </Badge>
                                {npc.desafio && (
                                  <Badge variant="outline" className="text-xs">
                                    {npc.desafio}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                CA: {npc.ca} | PV: {npc.pv.atual}/{npc.pv.maximo}
                                {npc.pm.maximo > 0 && ` | PM: ${npc.pm.maximo}`}
                              </div>
                              {npc.aparencia && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {npc.aparencia}
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

        {/* Ficha do NPC */}
        <div className="lg:col-span-2">
          <FichaNPC
            npc={npcSelecionado}
            onSave={salvarNPC}
            onDelete={excluirNPC}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </div>
  )
}

export default GerenciadorNPCs

