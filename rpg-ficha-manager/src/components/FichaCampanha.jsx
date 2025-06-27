import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Save, Edit, Trash2, Plus, Users, UserPlus, Calendar, MapPin, Scroll } from 'lucide-react'

const statusCampanha = [
  'Planejamento', 'Em Andamento', 'Pausada', 'Concluída', 'Cancelada'
]

const FichaCampanha = ({ campanha, onSave, onDelete, isEditing, setIsEditing, personagens, npcs }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    status: 'Planejamento',
    sessaoAtual: 1,
    totalSessoes: 0,
    personagensIds: [],
    npcsIds: [],
    localizacaoAtual: '',
    proximaSessao: '',
    anotacoesMestre: '',
    resumoSessoes: [],
    objetivos: [],
    recompensas: '',
    historia: ''
  })

  useEffect(() => {
    if (campanha) {
      setFormData(campanha)
    }
  }, [campanha])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const adicionarItem = (lista, novoItem) => {
    if (novoItem.trim()) {
      setFormData(prev => ({
        ...prev,
        [lista]: [...prev[lista], novoItem.trim()]
      }))
    }
  }

  const removerItem = (lista, index) => {
    setFormData(prev => ({
      ...prev,
      [lista]: prev[lista].filter((_, i) => i !== index)
    }))
  }

  const togglePersonagem = (personagemId) => {
    setFormData(prev => ({
      ...prev,
      personagensIds: prev.personagensIds.includes(personagemId)
        ? prev.personagensIds.filter(id => id !== personagemId)
        : [...prev.personagensIds, personagemId]
    }))
  }

  const toggleNPC = (npcId) => {
    setFormData(prev => ({
      ...prev,
      npcsIds: prev.npcsIds.includes(npcId)
        ? prev.npcsIds.filter(id => id !== npcId)
        : [...prev.npcsIds, npcId]
    }))
  }

  const adicionarSessao = () => {
    const novoResumo = `Sessão ${formData.resumoSessoes.length + 1}: `
    setFormData(prev => ({
      ...prev,
      resumoSessoes: [...prev.resumoSessoes, novoResumo],
      sessaoAtual: prev.sessaoAtual + 1
    }))
  }

  const editarSessao = (index, novoTexto) => {
    setFormData(prev => ({
      ...prev,
      resumoSessoes: prev.resumoSessoes.map((sessao, i) => 
        i === index ? novoTexto : sessao
      )
    }))
  }

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

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

  if (!isEditing && !campanha) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Nenhuma campanha selecionada</CardTitle>
          <CardDescription>Selecione uma campanha da lista ou crie uma nova</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const personagensSelecionados = personagens.filter(p => formData.personagensIds.includes(p.id))
  const npcsSelecionados = npcs.filter(n => formData.npcsIds.includes(n.id))

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {isEditing ? 'Editando Campanha' : formData.nome || 'Nova Campanha'}
              </CardTitle>
              {!isEditing && (
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant={getStatusColor(formData.status)}>
                    {formData.status}
                  </Badge>
                  <span>Sessão {formData.sessaoAtual}</span>
                  {formData.totalSessoes > 0 && (
                    <span>de {formData.totalSessoes}</span>
                  )}
                </CardDescription>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  {campanha && (
                    <Button variant="destructive" onClick={() => onDelete(campanha.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="participantes">Participantes</TabsTrigger>
          <TabsTrigger value="sessoes">Sessões</TabsTrigger>
          <TabsTrigger value="historia">História</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome da Campanha</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  {isEditing ? (
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusCampanha.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={formData.status} disabled />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Descrição da campanha..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sessaoAtual">Sessão Atual</Label>
                  <Input
                    id="sessaoAtual"
                    type="number"
                    min="1"
                    value={formData.sessaoAtual}
                    onChange={(e) => handleInputChange('sessaoAtual', parseInt(e.target.value) || 1)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="totalSessoes">Total Planejado</Label>
                  <Input
                    id="totalSessoes"
                    type="number"
                    min="0"
                    value={formData.totalSessoes}
                    onChange={(e) => handleInputChange('totalSessoes', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                    placeholder="0 = indefinido"
                  />
                </div>
                <div>
                  <Label htmlFor="localizacaoAtual">Localização Atual</Label>
                  <Input
                    id="localizacaoAtual"
                    value={formData.localizacaoAtual}
                    onChange={(e) => handleInputChange('localizacaoAtual', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Cidade, região..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="proximaSessao">Próxima Sessão</Label>
                <Input
                  id="proximaSessao"
                  value={formData.proximaSessao}
                  onChange={(e) => handleInputChange('proximaSessao', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Data/horário da próxima sessão..."
                />
              </div>

              <div>
                <Label htmlFor="anotacoesMestre">Anotações do Mestre</Label>
                <Textarea
                  id="anotacoesMestre"
                  value={formData.anotacoesMestre}
                  onChange={(e) => handleInputChange('anotacoesMestre', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Anotações privadas do mestre..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participantes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personagens */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personagens ({personagensSelecionados.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {personagensSelecionados.map((personagem) => (
                    <div key={personagem.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{personagem.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          {personagem.raca} {personagem.classe} - Nv. {personagem.nivel}
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePersonagem(personagem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {isEditing && (
                    <div className="space-y-2">
                      <Label>Adicionar Personagens</Label>
                      {personagens
                        .filter(p => !formData.personagensIds.includes(p.id))
                        .map((personagem) => (
                          <div key={personagem.id} className="flex items-center justify-between p-2 border rounded bg-muted">
                            <div>
                              <div className="font-medium">{personagem.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                {personagem.raca} {personagem.classe} - Nv. {personagem.nivel}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => togglePersonagem(personagem.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* NPCs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  NPCs Relevantes ({npcsSelecionados.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {npcsSelecionados.map((npc) => (
                    <div key={npc.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{npc.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs mr-1">
                            {npc.tipo}
                          </Badge>
                          {npc.desafio}
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleNPC(npc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {isEditing && (
                    <div className="space-y-2">
                      <Label>Adicionar NPCs</Label>
                      {npcs
                        .filter(n => !formData.npcsIds.includes(n.id))
                        .map((npc) => (
                          <div key={npc.id} className="flex items-center justify-between p-2 border rounded bg-muted">
                            <div>
                              <div className="font-medium">{npc.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs mr-1">
                                  {npc.tipo}
                                </Badge>
                                {npc.desafio}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleNPC(npc.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Resumo das Sessões
                </CardTitle>
                {isEditing && (
                  <Button onClick={adicionarSessao} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Sessão
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.resumoSessoes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma sessão registrada
                  </div>
                ) : (
                  formData.resumoSessoes.map((sessao, index) => (
                    <div key={index} className="border rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Sessão {index + 1}</h4>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removerItem('resumoSessoes', index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {isEditing ? (
                        <Textarea
                          value={sessao}
                          onChange={(e) => editarSessao(index, e.target.value)}
                          rows={3}
                          placeholder="Resumo da sessão..."
                        />
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{sessao}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scroll className="h-5 w-5" />
                História e Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="historia">História da Campanha</Label>
                <Textarea
                  id="historia"
                  value={formData.historia}
                  onChange={(e) => handleInputChange('historia', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Background e contexto da campanha..."
                />
              </div>

              <div>
                <Label>Objetivos Atuais</Label>
                <div className="space-y-2 mt-2">
                  {formData.objetivos.map((objetivo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{objetivo}</span>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerItem('objetivos', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Novo objetivo"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          adicionarItem('objetivos', e.target.value)
                          e.target.value = ''
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        const input = e.target.parentElement.querySelector('input')
                        adicionarItem('objetivos', input.value)
                        input.value = ''
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="recompensas">Recompensas e Tesouros</Label>
                <Textarea
                  id="recompensas"
                  value={formData.recompensas}
                  onChange={(e) => handleInputChange('recompensas', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tesouros encontrados, XP ganho, etc..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FichaCampanha

