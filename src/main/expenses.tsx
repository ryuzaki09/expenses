import React, {useState} from 'react'
import classname from 'classnames'
import {format} from 'date-fns'
import {DayPicker} from 'react-day-picker'

import {TextInput} from '../common/components/textInput'
import {Button} from '../common/components/button'

import 'react-day-picker/dist/style.css'
import styles from './expenses.module.css'

const today = new Date()
const year = today.getFullYear()
const currentMonth = today.getMonth()

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

interface IExpenseDetails {
  date: null | string;
  title: string;
  amount: string;
}

export function Expenses() {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [datePickerDate, setDatePickerDate] = useState(today)
  const [expenseDetails, setExpenseDetails] = useState<IExpenseDetails>({
    date: null,
    title: '',
    amount: ''
  })

  const onFocusHandler = () => {
    setDatePickerIsOpen(true);
  }
  const onSelectDate = (date?: Date) => {
    setDatePickerIsOpen(false)
    if (date) {
      const formattedDate = format(date, 'dd/MM/YYY')
      setExpenseDetails((prevState) => ({...prevState, date: formattedDate}))
    }
  }
  const onMonthClickCallback = (month: number) => {
    const newDate = new Date(year, month, 1) 
    setDatePickerDate(newDate)
  }

  const amountOnChange = (value: string) => {
    console.log('value: ', value)
    if (isNaN(+value)) {
      return
    }

    setExpenseDetails((prevState) => ({...prevState, amount: value}))
  }
  const titleOnChange = (value: string) => {
    setExpenseDetails((prevState) => ({...prevState, title: value}))
  }
  const addExpense = () => {
    console.log('expenseDetails: ', expenseDetails)
  }

  return (
    <>
      Today's date: {format(today, 'dd/MM/yyyy')}
      <Months callbackFn={onMonthClickCallback} />
      <TextInput
        label="date"
        readOnly
        onFocus={onFocusHandler}
        value={expenseDetails.date || ''} 
      />
      {datePickerIsOpen && (
        <DayPicker
          mode="single"
          onSelect={onSelectDate}
          fromMonth={datePickerDate}
          toMonth={datePickerDate}
          disabled={{after: today}}
        />
      )}
      <TextInput
        value={expenseDetails.title}
        label="title"
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => titleOnChange(e.target.value)
        }
      />
      <TextInput
        value={expenseDetails.amount}
        label="amount"
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => amountOnChange(e.target.value)
        }
      />
      <div>
        <Button onClick={addExpense}>Add</Button>
      </div>
    </>
  )
}

interface IMonthProps {
  callbackFn: (month: number) => void
}

function Months({callbackFn}: IMonthProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  return (
    <>
      <ul className={styles.monthsContainer}>
        {monthNames.map((month, index) => {
          const isBeyondCurrentMonth = index > currentMonth
          const isSelectedMonth = selectedMonth === index

          return (
            <li
              key={month}
              className={
                classname({
                  [styles.disabled]: isBeyondCurrentMonth,
                  [styles.selected]: isSelectedMonth
                })
              }
              onClick={() => {
                if (isBeyondCurrentMonth) {
                  return 
                }
                setSelectedMonth(index)
                callbackFn(index)
              }}
            >
              {month}
            </li>
          )
        })}
      </ul>
    </>
  )
}
