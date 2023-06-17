import React, { ReactNode } from 'react'
import { transitions, positions, Provider } from 'react-alert'
import { Template } from './Template'

type Props = {
  children: ReactNode
}

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  transition: transitions.FADE,
}

function AlertProvider({ children }: Props) {
  return (
    <Provider template={Template} {...options}>
      {children}
    </Provider>
  )
}

export default AlertProvider
