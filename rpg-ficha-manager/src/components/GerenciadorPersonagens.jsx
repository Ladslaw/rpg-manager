import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Plus, Search, Users } from 'lucide-react'
import FichaPersonagem from './FichaPersonagem.jsx'

const GerenciadorPersonagens = () => {
  const [personagens, setPersonagens] = useState([])
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const dados = localStorage.getItem('rpg-personagens')
    if (dados) setPersonagens(JSON.parse(dados))
  }, [])

  useEffect(() => {
    localStorage.setItem('rpg-personagens', JSON.stringify(personagens))
  }, [personagens])

  const salvar = (p) => {
    if (personagemSelecionado) {
      setPersonagens(prev => prev.map(x => x.id === personagemSelecionado.id ? { ...p, id: personagemSelecionado.id } : x))
    } else {
      const novo = { ...p, id: Date.now().toString() }
      setPersonagens(prev => [...prev, novo])
    }
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Personagens</CardTitle>
                <Button onClick={() => { setIsEditing(true); setPersonagemSelecionado(null) }}><Plus className="h-4 w-4" /></Button>
              </div>
              <CardDescription>{personagens.length} personagem(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar..." />
              </div>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {personagens.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase())).map(p => (
                    <Card key={p.id} onClick={() => { setPersonagemSelecionado(p); setIsEditing(false) }}
                      className={`cursor-pointer transition-all rounded-lg border ${personagemSelecionado?.id === p.id ? 'border-primary ring-2 ring-primary/50' : 'hover:border-muted'}`}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{p.nome}</h3>
                        <div className="flex flex-wrap gap-1">
                          <Badge>{p.raca}</Badge>
                          <Badge>{p.classe}</Badge>
                          <Badge>Nv. {p.nivel}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <FichaPersonagem
            personagem={personagemSelecionado}
            onSave={salvar}
            onDelete={(id) => setPersonagens(prev => prev.filter(p => p.id !== id))}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </div>
    </div>
  )
}

export default GerenciadorPersonagens