import React from 'react'

export function ExpenseTotals({expenses}) {
  console.log('expenses: ', expenses)
  const total = expenses.reduce((acc, value) => acc + value.amount, 0)
  console.log('total: ', total)

  return (
    <div>Total {total.toFixed(2)}</div>
  )
}
