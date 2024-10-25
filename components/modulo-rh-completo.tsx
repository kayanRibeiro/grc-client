"use client"

import { useState } from "react"
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  UserPlus,
  DollarSign,
  Briefcase,
  Search,
  BarChart2,
  FileText,
  Gift,
  GraduationCap,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo
const funcionarios = [
  { id: 1, nome: "João Silva", cargo: "Desenvolvedor", salario: "R$ 5.000" },
  { id: 2, nome: "Maria Santos", cargo: "Designer", salario: "R$ 4.500" },
  { id: 3, nome: "Carlos Oliveira", cargo: "Gerente de Projetos", salario: "R$ 8.000" },
  { id: 4, nome: "Ana Rodrigues", cargo: "Analista de RH", salario: "R$ 4.000" },
  { id: 5, nome: "Pedro Costa", cargo: "Analista de Marketing", salario: "R$ 4.200" },
]

const folhaPagamento = [
  { id: 1, funcionario: "João Silva", salarioBase: 5000, beneficios: 500, impostos: 1500, liquido: 4000 },
  { id: 2, funcionario: "Maria Santos", salarioBase: 4500, beneficios: 450, impostos: 1350, liquido: 3600 },
  { id: 3, funcionario: "Carlos Oliveira", salarioBase: 8000, beneficios: 800, impostos: 2400, liquido: 6400 },
  { id: 4, funcionario: "Ana Rodrigues", salarioBase: 4000, beneficios: 400, impostos: 1200, liquido: 3200 },
  { id: 5, funcionario: "Pedro Costa", salarioBase: 4200, beneficios: 420, impostos: 1260, liquido: 3360 },
]

const beneficios = [
  { id: 1, nome: "Plano de Saúde", descricao: "Cobertura médica e odontológica" },
  { id: 2, nome: "Vale Refeição", descricao: "R$ 30 por dia útil" },
  { id: 3, nome: "Vale Transporte", descricao: "Conforme necessidade do funcionário" },
  { id: 4, nome: "Seguro de Vida", descricao: "Cobertura de 100x o salário" },
  { id: 5, nome: "Gympass", descricao: "Acesso a academias conveniadas" },
]

const treinamentos = [
  { id: 1, nome: "Introdução ao React", participantes: 15, concluido: 10 },
  { id: 2, nome: "Gestão de Projetos Ágeis", participantes: 20, concluido: 18 },
  { id: 3, nome: "Design Thinking", participantes: 12, concluido: 8 },
  { id: 4, nome: "Liderança e Comunicação", participantes: 25, concluido: 22 },
  { id: 5, nome: "Segurança da Informação", participantes: 30, concluido: 28 },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="mt-5">
        <Link to="/" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${location.pathname === "/" ? "bg-gray-200" : ""}`}>
          <BarChart2 className="inline-block mr-2 h-4 w-4" />
          Dashboard
        </Link>
        <Link to="/funcionarios" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${location.pathname === "/funcionarios" ? "bg-gray-200" : ""}`}>
          <Users className="inline-block mr-2 h-4 w-4" />
          Funcionários
        </Link>
        <Link to="/folha-pagamento" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${location.pathname === "/folha-pagamento" ? "bg-gray-200" : ""}`}>
          <FileText className="inline-block mr-2 h-4 w-4" />
          Folha de Pagamento
        </Link>
        <Link to="/beneficios" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${location.pathname === "/beneficios" ? "bg-gray-200" : ""}`}>
          <Gift className="inline-block mr-2 h-4 w-4" />
          Benefícios
        </Link>
        <Link to="/treinamentos" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${location.pathname === "/treinamentos" ? "bg-gray-200" : ""}`}>
          <GraduationCap className="inline-block mr-2 h-4 w-4" />
          Treinamentos
        </Link>
      </nav>
    </aside>
  )
}

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard de RH</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionarios.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folha de Pagamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 25.700</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vagas Abertas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Treinamentos</CardTitle>
          <CardDescription>Progresso dos treinamentos em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          {treinamentos.map((treinamento) => (
            <div key={treinamento.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{treinamento.nome}</span>
                <span>{Math.round((treinamento.concluido / treinamento.participantes) * 100)}%</span>
              </div>
              <Progress value={(treinamento.concluido / treinamento.participantes) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function Funcionarios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: "", cargo: "", salario: "" })

  const filteredFuncionarios = funcionarios.filter(
    (funcionario) =>
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNovoFuncionario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Novo funcionário:", novoFuncionario)
    setNovoFuncionario({ nome: "", cargo: "", salario: "" })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Funcionários</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pesquisar funcionários"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo funcionário aqui. Clique em salvar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nome" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={novoFuncionario.nome}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cargo" className="text-right">
                    Cargo
                  </Label>
                  <Input
                    id="cargo"
                    name="cargo"
                    value={novoFuncionario.cargo}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="salario" className="text-right">
                    Salário
                  </Label>
                  <Input
                    id="salario"
                    name="salario"
                    value={novoFuncionario.salario}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar funcionário</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
          <CardDescription>Uma visão geral de todos os funcionários na empresa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Salário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFuncionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell>{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cargo}</TableCell>
                  <TableCell>{funcionario.salario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function FolhaPagamento() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Folha de Pagamento</h1>
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Folha de Pagamento</CardTitle>
          <CardDescription>Detalhes dos pagamentos de todos os funcionários</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Salário Base</TableHead>
                <TableHead>Benefícios</TableHead>
                <TableHead>Impostos</TableHead>
                <TableHead>Salário Líquido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folhaPagamento.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.funcionario}</TableCell>
                  <TableCell>R$ &nbsp;{item.salarioBase.toFixed(2)}</TableCell>
                  <TableCell>R$&nbsp;{item.beneficios.toFixed(2)}</TableCell>
                  <TableCell>R$&nbsp;{item.impostos.toFixed(2)}</TableCell>
                  <TableCell>R$&nbsp;{item.liquido.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Beneficios() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Benefícios</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Benefícios</CardTitle>
          <CardDescription>Benefícios oferecidos aos funcionários</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Benefício</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficios.map((beneficio) => (
                <TableRow key={beneficio.id}>
                  <TableCell>{beneficio.nome}</TableCell>
                  <TableCell>{beneficio.descricao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Treinamentos() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Treinamentos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Treinamentos em Andamento</CardTitle>
          <CardDescription>Progresso dos treinamentos atuais</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Treinamento</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Progresso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treinamentos.map((treinamento) => (
                <TableRow key={treinamento.id}>
                  <TableCell>{treinamento.nome}</TableCell>
                  <TableCell>{treinamento.participantes}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Progress value={(treinamento.concluido / treinamento.participantes) * 100} className="mr-2" />
                      <span>{Math.round((treinamento.concluido / treinamento.participantes) * 100)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export function ModuloRhCompleto() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/folha-pagamento" element={<FolhaPagamento />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/treinamentos" element={<Treinamentos />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}