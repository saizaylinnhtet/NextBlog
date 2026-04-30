"use client"

import { checkCookieType } from '@/lib/type'
import React, { createContext, useContext } from 'react'

const SessionContext = createContext<checkCookieType | null>(null)

export const SessionProvider = ({children, session}: {children: React.ReactNode, session: checkCookieType}) => {
  return (
    <SessionContext.Provider value={ session }>
        {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const session = useContext(SessionContext)
  return session
}