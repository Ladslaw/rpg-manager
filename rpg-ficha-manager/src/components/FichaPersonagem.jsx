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
import { Plus, Save, Edit, Trash2 } from 'lucide-react'

const racas = ['Humano', 'Elfo', 'Anão']
const classes = ['Guerreiro', 'Mago', 'Clérigo']
const origens = ['Acólito', 'Nobre', 'Soldado']
const pericias = ['Atletismo', 'Intuição', 'Religião']

const FichaPersonagem = ({ personagem, onSave, onDelete, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    nome: '', raca: '', classe: '', origem: '', nivel: 1,
    atributos: { forca: 10, destreza: 10 },
    pv: { atual: 0, maximo: 0 },
    pm: { atual: 0, maximo: 0 },
    ca: 10, deslocamento: 9,
    periciasEscolhidas: [], equipamentos: [], magias: [], anotacoes: ''
  })

  useEffect(() => { if (personagem) setFormData(personagem) }, [personagem])

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }))
    } else setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => { onSave(formData); setIsEditing(false) }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{isEditing ? 'Editando' : formData.nome || 'Novo'}</CardTitle>
            {!isEditing && <CardDescription>{formData.raca} {formData.classe}</CardDescription>}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}><Save className="h-4 w-4" /> Salvar</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}><Edit className="h-4 w-4" /> Editar</Button>
                <Button variant="destructive" onClick={() => onDelete(personagem?.id)}><Trash2 className="h-4 w-4" /></Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basico" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted rounded-lg p-1 shadow-sm">
            <TabsTrigger value="basico">Básico</TabsTrigger>
            <TabsTrigger value="atributos">Atributos</TabsTrigger>
            <TabsTrigger value="pericias">Perícias</TabsTrigger>
          </TabsList>
          <TabsContent value="basico" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} />
              </div>
              <div>
                <Label>Nível</Label>
                <Input type="number" value={formData.nivel} onChange={(e) => handleInputChange('nivel', parseInt(e.target.value))} />
              </div>
              <div>
                <Label>Raça</Label>
                <Select value={formData.raca} onValueChange={(v) => handleInputChange('raca', v)}>
                  <SelectTrigger><SelectValue placeholder="Raça" /></SelectTrigger>
                  <SelectContent>{racas.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Classe</Label>
                <Select value={formData.classe} onValueChange={(v) => handleInputChange('classe', v)}>
                  <SelectTrigger><SelectValue placeholder="Classe" /></SelectTrigger>
                  <SelectContent>{classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="atributos">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Força</Label><Input value={formData.atributos.forca} type="number" onChange={(e) => handleInputChange('atributos.forca', parseInt(e.target.value))} /></div>
              <div><Label>Destreza</Label><Input value={formData.atributos.destreza} type="number" onChange={(e) => handleInputChange('atributos.destreza', parseInt(e.target.value))} /></div>
            </div>
          </TabsContent>
          <TabsContent value="pericias">
            <Label>Perícias</Label>
            <div className="flex gap-2 flex-wrap mt-2">{formData.periciasEscolhidas.map((p, i) => <Badge key={i}>{p}</Badge>)}</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default FichaPersonagem