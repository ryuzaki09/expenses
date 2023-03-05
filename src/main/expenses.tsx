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

export function Expenses() {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [expenseDate, setExpenseDate] = useState<string | null>(null)
  const [datePickerDate, setDatePickerDate] = useState(date)

  const onFocusHandler = () => {
    setDatePickerIsOpen(true);
  }
  const onSelectDate = (date?: Date) => {
    setDatePickerIsOpen(false)
    if (date) {
      const formattedDate = format(date, 'dd/MM/YYY')
      setExpenseDate(formattedDate)
    }
  }
  const onMonthClickCallback = (month: number) => {
    const newDate = new Date(year, month, 1) 
    // console.log('newdate: ', format(newDate, "dd/MM/yyyy"))
    setDatePickerDate(newDate)
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
        value={expenseDate || ''} 
      />
      {datePickerIsOpen && (
        <DayPicker
          mode="single"
          onSelect={onSelectDate}
          fromMonth={datePickerDate}
          toMonth={datePickerDate}
        />
      )}
      <TextInput label="amount" />
      <div>
        <Button>Add</Button>
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
