import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Save, Edit, Trash2, Plus } from 'lucide-react'

// Dados simplificados para NPCs
const tiposNPC = [
  'Aliado', 'Neutro', 'Inimigo', 'Comerciante', 'Autoridade', 'Informante', 
  'Guarda', 'Criminoso', 'Nobre', 'Plebeu', 'Monstro', 'Animal'
]

const desafios = [
  'Trivial', 'Fácil', 'Moderado', 'Difícil', 'Extremo', 'Lendário'
]

const FichaNPC = ({ npc, onSave, onDelete, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    desafio: '',
    ca: 10,
    pv: { atual: 0, maximo: 0 },
    pm: { atual: 0, maximo: 0 },
    deslocamento: 9,
    atributos: {
      forca: 10,
      destreza: 10,
      constituicao: 10,
      inteligencia: 10,
      sabedoria: 10,
      carisma: 10
    },
    ataques: [],
    habilidades: [],
    taticas: '',
    motivacao: '',
    aparencia: '',
    personalidade: '',
    historia: '',
    tesouro: '',
    anotacoes: ''
  })

  useEffect(() => {
    if (npc) {
      setFormData(npc)
    }
  }, [npc])

  const calcularModificador = (valor) => {
    return Math.floor((valor - 10) / 2)
  }

  const formatarModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleAtributoChange = (atributo, valor) => {
    setFormData(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [atributo]: parseInt(valor) || 0
      }
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

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

  if (!isEditing && !npc) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Nenhum NPC selecionado</CardTitle>
          <CardDescription>Selecione um NPC da lista ou crie um novo</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {isEditing ? 'Editando NPC' : formData.nome || 'Novo NPC'}
              </CardTitle>
              {!isEditing && (
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge variant={formData.tipo === 'Aliado' ? 'default' : 
                                formData.tipo === 'Inimigo' ? 'destructive' : 'secondary'}>
                    {formData.tipo}
                  </Badge>
                  {formData.desafio && (
                    <Badge variant="outline">{formData.desafio}</Badge>
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
                  {npc && (
                    <Button variant="destructive" onClick={() => onDelete(npc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              {isEditing ? (
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposNPC.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.tipo} disabled />
              )}
            </div>
            <div>
              <Label htmlFor="desafio">Nível de Desafio</Label>
              {isEditing ? (
                <Select value={formData.desafio} onValueChange={(value) => handleInputChange('desafio', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o desafio" />
                  </SelectTrigger>
                  <SelectContent>
                    {desafios.map(desafio => (
                      <SelectItem key={desafio} value={desafio}>{desafio}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.desafio} disabled />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Combate */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas de Combate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <Label>CA</Label>
              <Input
                type="number"
                value={formData.ca}
                onChange={(e) => handleInputChange('ca', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>PV Atual</Label>
              <Input
                type="number"
                value={formData.pv.atual}
                onChange={(e) => handleInputChange('pv.atual', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>PV Máximo</Label>
              <Input
                type="number"
                value={formData.pv.maximo}
                onChange={(e) => handleInputChange('pv.maximo', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>PM</Label>
              <Input
                type="number"
                value={formData.pm.maximo}
                onChange={(e) => handleInputChange('pm.maximo', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Deslocamento</Label>
              <Input
                type="number"
                value={formData.deslocamento}
                onChange={(e) => handleInputChange('deslocamento', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atributos */}
      <Card>
        <CardHeader>
          <CardTitle>Atributos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(formData.atributos).map(([atributo, valor]) => {
              const mod = calcularModificador(valor)
              return (
                <div key={atributo} className="text-center">
                  <Label className="capitalize">{atributo}</Label>
                  <div className="text-2xl font-bold">{valor}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatarModificador(mod)}
                  </div>
                  {isEditing && (
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={valor}
                      onChange={(e) => handleAtributoChange(atributo, e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ataques e Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ataques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.ataques.map((ataque, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{ataque}</span>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerItem('ataques', index)}
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
                  placeholder="Novo ataque (ex: Espada Longa +5 (1d8+3))"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      adicionarItem('ataques', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input')
                    adicionarItem('ataques', input.value)
                    input.value = ''
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habilidades Especiais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.habilidades.map((habilidade, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{habilidade}</span>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerItem('habilidades', index)}
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
                  placeholder="Nova habilidade"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      adicionarItem('habilidades', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input')
                    adicionarItem('habilidades', input.value)
                    input.value = ''
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informações de Roleplay */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Roleplay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="aparencia">Aparência</Label>
              <Textarea
                id="aparencia"
                value={formData.aparencia}
                onChange={(e) => handleInputChange('aparencia', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Descrição física do NPC..."
              />
            </div>
            <div>
              <Label htmlFor="personalidade">Personalidade</Label>
              <Textarea
                id="personalidade"
                value={formData.personalidade}
                onChange={(e) => handleInputChange('personalidade', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Traços de personalidade..."
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="historia">História</Label>
            <Textarea
              id="historia"
              value={formData.historia}
              onChange={(e) => handleInputChange('historia', e.target.value)}
              disabled={!isEditing}
              rows={3}
              placeholder="Background e história do NPC..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taticas">Táticas de Combate</Label>
              <Textarea
                id="taticas"
                value={formData.taticas}
                onChange={(e) => handleInputChange('taticas', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="Como o NPC luta..."
              />
            </div>
            <div>
              <Label htmlFor="motivacao">Motivação</Label>
              <Textarea
                id="motivacao"
                value={formData.motivacao}
                onChange={(e) => handleInputChange('motivacao', e.target.value)}
                disabled={!isEditing}
                rows={3}
                placeholder="O que motiva este NPC..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tesouro">Tesouro/Equipamentos</Label>
            <Textarea
              id="tesouro"
              value={formData.tesouro}
              onChange={(e) => handleInputChange('tesouro', e.target.value)}
              disabled={!isEditing}
              rows={2}
              placeholder="Itens que o NPC possui..."
            />
          </div>

          <div>
            <Label htmlFor="anotacoes">Anotações do Mestre</Label>
            <Textarea
              id="anotacoes"
              value={formData.anotacoes}
              onChange={(e) => handleInputChange('anotacoes', e.target.value)}
              disabled={!isEditing}
              rows={3}
              placeholder="Notas pessoais sobre o NPC..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FichaNPC

