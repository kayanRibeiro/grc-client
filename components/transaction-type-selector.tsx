'use client'

import { useTransaction } from './transaction-context'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormField, FormItem, FormControl } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

export function TransactionTypeSelectorComponent() {
  const { updateTransaction } = useTransaction()
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value)
                updateTransaction('type', value)
              }}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Receita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Despesa</Label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}