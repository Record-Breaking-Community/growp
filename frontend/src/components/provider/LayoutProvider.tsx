import React, { createContext, useContext, useState } from 'react'
import { LayoutContext as ContextType } from '~/types/provider'
import { ProviderProps } from '~/types/util'

const LayoutContext = createContext<ContextType>({} as any)

const LayoutProvider = ({ children }: ProviderProps) => {
  const [layoutValue, setLayoutValue] = useState<ContextType['layoutValue']>({
    siteTitle: 'default',
  })

  return (
    <LayoutContext.Provider value={{ layoutValue, setLayoutValue }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider

export const useLayout = () => useContext(LayoutContext)
