import React from 'react'

import styles from './index.module.css'

interface ITextInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export function TextInput({
  label,
  ...props
}: ITextInputProps) {
  return (
    <>
      {label && <label className={styles.label} htmlFor={label}>{label}</label>}
      <input className={styles.textInput} type='text' {...props} />
    </>
  )
}
