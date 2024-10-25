'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign, TrendingUp, TrendingDown, Plus, FileText, Download } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Dados de exemplo para o gráfico
const cashFlowData = [
  { name: 'Jan', receitas: 4000, despesas: 2400 },
  { name: 'Fev', receitas: 3000, despesas: 1398 },
  { name: 'Mar', receitas: 2000, despesas: 9800 },
  { name: 'Abr', receitas: 2780, despesas: 3908 },
  { name: 'Mai', receitas: 1890, despesas: 4800 },
  { name: 'Jun', receitas: 2390, despesas: 3800 },
]

export function FinanceModule() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Finanças</h1>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Transação
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Saldo Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$54.231,89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receitas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$17.405,00</div>
                <p className="text-xs text-muted-foreground">
                  +8% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$12.586,00</div>
                <p className="text-xs text-muted-foreground">
                  +2% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$4.819,00</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="receitas" stroke="#8884d8" />
                  <Line type="monotone" dataKey="despesas" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>
                Você fez 12 transações este mês.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista de transações recentes.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-06-01</TableCell>
                    <TableCell>Venda de Produto A</TableCell>
                    <TableCell>Vendas</TableCell>
                    <TableCell className="text-right">R$1.200,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-06-02</TableCell>
                    <TableCell>Pagamento de Fornecedor X</TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell className="text-right">-R$500,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-06-03</TableCell>
                    <TableCell>Venda de Serviço B</TableCell>
                    <TableCell>Vendas</TableCell>
                    <TableCell className="text-right">R$800,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior</Button>
              <Button variant="outline">Próximo</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>
                Gere e baixe relatórios financeiros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Tipo de Relatório</Label>
                <select id="report-type" className="w-full p-2 border rounded">
                  <option>Balanço Patrimonial</option>
                  <option>Demonstração de Resultados</option>
                  <option>Fluxo de Caixa</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Data Inicial</Label>
                  <Input type="date" id="start-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Data Final</Label>
                  <Input type="date" id="end-date" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" /> Gerar e Baixar Relatório
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
