import React from 'react'

import styles from './index.module.css'

interface IButtonProps {
  children: React.ReactNode;
}

export function Button({
  children
}: IButtonProps) {
  return <button className={styles.button} type='button'>{children}</button>
}
