'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionProvider, initialState, useTransaction } from './transaction-context'
import TransactionTypeSelector from './transaction-type-selector'
import TransactionDetails from './transaction-details'
import TransactionCategorizationDetails from './transaction-categorization-details'
import TransactionPreview from './transaction-preview'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "O valor deve ser um número positivo",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  description: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  paymentMethod: z.string().min(1, "Selecione um método de pagamento"),
  tags: z.string(),
  documentNumber: z.string().regex(/^\d{1,44}$/, "Número de documento inválido"),
  fiscalNature: z.string().min(1, "Selecione a natureza fiscal"),
})

function TransactionFormContent() {
  const { updateTransaction, resetTransaction } = useTransaction()

  const methods = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialState,
  })

  function onSubmit(data: z.infer<typeof transactionSchema>) {
    console.log('Transação submetida:', data)
    toast({
      title: "Transação registrada com sucesso",
      description: `${data.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${data.amount} registrada.`,
    })
    resetTransaction()
    methods.reset(initialState)
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Nova Transação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <TransactionTypeSelector />
              <TransactionDetails />
              <TransactionCategorizationDetails />
            </CardContent>
            <CardFooter>
              <Button type="submit">Salvar Transação</Button>
            </CardFooter>
          </Card>

          <TransactionPreview />
        </form>
      </Form>
    </FormProvider>
  )
}

export function TransactionForm() {
  return (
    <TransactionProvider>
      <TransactionFormContent />
    </TransactionProvider>
  )
}