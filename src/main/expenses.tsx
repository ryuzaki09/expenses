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
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [expenseDate, setExpenseDate] = useState<string | null>(null);
  const onFocusHandler = () => {
    setDatePickerIsOpen(true);
  }
  const onSelectDate = (data: any) => {
    console.log('data: ', data)
    setDatePickerIsOpen(false)
    const formattedDate = format(data, 'dd/MM/YYY')
    setExpenseDate(formattedDate)
  }
  console.log('todays date: ', format(date, "dd/MM/yyyy"))

  return (
    <>
      Today's date: {format(date, 'dd/MM/yyyy')}
      <Months />
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
          fromMonth={date}
          toMonth={date}
        />
      )}
      <div>
        {`${monthNames[currentMonth]} ${year}`}
      </div>
      <TextInput label="amount" />
      <div>
        <Button>Add</Button>
      </div>
    </>
  )
}

function Months() {
  return (
    <>
      <ul className={styles.monthsContainer}>
        {monthNames.map((month, index) => {
          console.log('currentMonth: ', currentMonth,' month: ', month)
        const isBeyondCurrentMonth = index > currentMonth
          return (
            <li key={month} className={
              classname({[styles.disabled]: isBeyondCurrentMonth})
            }>
              {month}
            </li>
          )
        })}
      </ul>
    </>
  )
}
