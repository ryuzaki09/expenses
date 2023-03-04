import React from 'react'

import { Expenses } from "./expenses"

import styles from './index.module.css'

export function Main() {
  return <div className={styles.main}><Expenses /></div>
}
