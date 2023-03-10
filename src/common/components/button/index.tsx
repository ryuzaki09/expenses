import React from 'react'

import styles from './index.module.css'

interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({
  children,
  onClick
}: IButtonProps) {
  return (
    <button
      className={styles.button}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
