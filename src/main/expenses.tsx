import React, {useState} from 'react'
import classname from 'classnames'
import {format} from 'date-fns'
import {DayPicker} from 'react-day-picker'

import {TextInput} from '../common/components/textInput'
import {Button} from '../common/components/button'

import 'react-day-picker/dist/style.css'
import styles from './expenses.module.css'

const date = new Date()
// console.log('Date: ', new Date(2021, 0, 23));
const year = date.getFullYear()
const currentMonth = date.getMonth()

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

interface IExpenseDetails {
  date: null | string;
  amount: string;
}

export function Expenses() {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [datePickerDate, setDatePickerDate] = useState(date)
  const [expenseDetails, setExpenseDetails] = useState<IExpenseDetails>({
    date: null,
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
    // console.log('newdate: ', format(newDate, "dd/MM/yyyy"))
    setDatePickerDate(newDate)
  }

  const amountOnChange = (value: string) => {
    console.log('value: ', value)
    if (isNaN(value)) {
      return
    }

    setExpenseDetails((prevState) => ({...prevState, amount: value}))
  }
  const addExpense = () => {
    console.log('expenseDetails: ', expenseDetails)
  }
  // console.log('todays date: ', format(date, "dd/MM/yyyy"))

  return (
    <>
      Today's date: {format(date, 'dd/MM/yyyy')}
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
        />
      )}
      <TextInput
        value={expenseDetails.amount}
        label="amount"
        onChange={(e) => amountOnChange(e.target.value)}
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
          // console.log('currentMonth: ', currentMonth,' month: ', month)
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
