import React from 'react'

interface IExpenseListProps {
  expenses: any[];
}

export function ExpenseList({expenses}: IExpenseListProps) {
  return (
    <ul>
      {expenses.map((e) => (
        <li>{e.title} {e.amount.toFixed(2)} {e.date}</li>
      ))}
    </ul>
  )
}
