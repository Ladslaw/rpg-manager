import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Plus, Minus, Save, Edit, Trash2 } from 'lucide-react'

// Dados base para Tormenta 20/D&D 5e
const racas = [
  'Humano', 'Elfo', 'Anão', 'Halfling', 'Meio-elfo', 'Meio-orc', 
  'Draconato', 'Gnomo', 'Tiefling', 'Aarakocra', 'Genasi', 'Goliath',
  'Minotauro', 'Centauro', 'Medusa', 'Sátiro', 'Sílfide', 'Suraggel'
]

const classes = [
  'Arcanista', 'Bárbaro', 'Bardo', 'Bucaneiro', 'Caçador', 'Cavaleiro',
  'Clérigo', 'Druida', 'Guerreiro', 'Inventor', 'Ladino', 'Lutador',
  'Nobre', 'Paladino', 'Ranger', 'Feiticeiro', 'Bruxo', 'Mago'
]

const origens = [
  'Acólito', 'Artesão', 'Artista', 'Assistente de Laboratório', 'Batedor',
  'Capanga', 'Charlatão', 'Criminoso', 'Curandeiro', 'Eremita', 'Escravo',
  'Estudioso', 'Fazendeiro', 'Forasteiro', 'Gladiador', 'Guarda', 'Herdeiro',
  'Herói Camponês', 'Marujo', 'Mateiro', 'Mercador', 'Minerador', 'Nômade',
  'Refugiado', 'Selvagem', 'Soldado', 'Taverneiro'
]

const pericias = [
  'Acrobacia', 'Adestramento', 'Atletismo', 'Atuação', 'Cavalgar', 'Conhecimento',
  'Cura', 'Diplomacia', 'Enganação', 'Fortitude', 'Furtividade', 'Guerra',
  'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Jogatina', 'Ladinagem',
  'Luta', 'Misticismo', 'Navegação', 'Nobreza', 'Ofício', 'Percepção', 'Pilotagem',
  'Pontaria', 'Reflexos', 'Religião', 'Sobrevivência', 'Vontade'
]

const FichaPersonagem = ({ personagem, onSave, onDelete, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    classe: '',
    origem: '',
    nivel: 1,
    atributos: {
      forca: 10,
      destreza: 10,
      constituicao: 10,
      inteligencia: 10,
      sabedoria: 10,
      carisma: 10
    },
    pv: { atual: 0, maximo: 0 },
    pm: { atual: 0, maximo: 0 },
    ca: 10,
    deslocamento: 9,
    periciasEscolhidas: [],
    equipamentos: [],
    magias: [],
    habilidades: [],
    anotacoes: '',
    imagem: ''
  })

  useEffect(() => {
    if (personagem) {
      setFormData(personagem)
    }
  }, [personagem])

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

  if (!isEditing && !personagem) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Nenhum personagem selecionado</CardTitle>
          <CardDescription>Selecione um personagem da lista ou crie um novo</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">
              {isEditing ? 'Editando Personagem' : formData.nome || 'Novo Personagem'}
            </CardTitle>
            {!isEditing && (
              <CardDescription>
                {formData.raca} {formData.classe} - Nível {formData.nivel}
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
                {personagem && (
                  <Button variant="destructive" onClick={() => onDelete(personagem.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="basico" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basico">Básico</TabsTrigger>
            <TabsTrigger value="atributos">Atributos</TabsTrigger>
            <TabsTrigger value="pericias">Perícias</TabsTrigger>
            <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
            <TabsTrigger value="magias">Magias</TabsTrigger>
          </TabsList>

          <TabsContent value="basico" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="nivel">Nível</Label>
                <Input
                  id="nivel"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.nivel}
                  onChange={(e) => handleInputChange('nivel', parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="raca">Raça</Label>
                {isEditing ? (
                  <Select value={formData.raca} onValueChange={(value) => handleInputChange('raca', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma raça" />
                    </SelectTrigger>
                    <SelectContent>
                      {racas.map(raca => (
                        <SelectItem key={raca} value={raca}>{raca}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={formData.raca} disabled />
                )}
              </div>
              <div>
                <Label htmlFor="classe">Classe</Label>
                {isEditing ? (
                  <Select value={formData.classe} onValueChange={(value) => handleInputChange('classe', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(classe => (
                        <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={formData.classe} disabled />
                )}
              </div>
              <div>
                <Label htmlFor="origem">Origem</Label>
                {isEditing ? (
                  <Select value={formData.origem} onValueChange={(value) => handleInputChange('origem', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {origens.map(origem => (
                        <SelectItem key={origem} value={origem}>{origem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={formData.origem} disabled />
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <Label>PM Atual</Label>
                <Input
                  type="number"
                  value={formData.pm.atual}
                  onChange={(e) => handleInputChange('pm.atual', parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>PM Máximo</Label>
                <Input
                  type="number"
                  value={formData.pm.maximo}
                  onChange={(e) => handleInputChange('pm.maximo', parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Classe de Armadura</Label>
                <Input
                  type="number"
                  value={formData.ca}
                  onChange={(e) => handleInputChange('ca', parseInt(e.target.value) || 0)}
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

            <div>
              <Label htmlFor="anotacoes">Anotações</Label>
              <Textarea
                id="anotacoes"
                value={formData.anotacoes}
                onChange={(e) => handleInputChange('anotacoes', e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Anotações sobre o personagem..."
              />
            </div>
          </TabsContent>

          <TabsContent value="atributos" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(formData.atributos).map(([atributo, valor]) => {
                const mod = calcularModificador(valor)
                return (
                  <Card key={atributo}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm capitalize">{atributo}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-center">
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
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="pericias" className="space-y-4">
            <div>
              <Label>Perícias Treinadas</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.periciasEscolhidas.map((pericia, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {pericia}
                    {isEditing && (
                      <button
                        onClick={() => removerItem('periciasEscolhidas', index)}
                        className="ml-1 text-xs"
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Select onValueChange={(value) => adicionarItem('periciasEscolhidas', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Adicionar perícia" />
                  </SelectTrigger>
                  <SelectContent>
                    {pericias
                      .filter(p => !formData.periciasEscolhidas.includes(p))
                      .map(pericia => (
                        <SelectItem key={pericia} value={pericia}>{pericia}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </TabsContent>

          <TabsContent value="equipamentos" className="space-y-4">
            <div>
              <Label>Equipamentos</Label>
              <div className="space-y-2 mt-2">
                {formData.equipamentos.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span>{item}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerItem('equipamentos', index)}
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
                    placeholder="Novo equipamento"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        adicionarItem('equipamentos', e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.target.parentElement.querySelector('input')
                      adicionarItem('equipamentos', input.value)
                      input.value = ''
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="magias" className="space-y-4">
            <div>
              <Label>Magias Conhecidas</Label>
              <div className="space-y-2 mt-2">
                {formData.magias.map((magia, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span>{magia}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerItem('magias', index)}
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
                    placeholder="Nova magia"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        adicionarItem('magias', e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.target.parentElement.querySelector('input')
                      adicionarItem('magias', input.value)
                      input.value = ''
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default FichaPersonagem

