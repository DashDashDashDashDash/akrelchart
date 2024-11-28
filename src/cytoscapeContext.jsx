import { createContext, useRef } from 'react'

export const CytoscapeContext = createContext();

export function CytoscapeProvider({children}) {
  let cyRef = useRef(null)

  return (
    <CytoscapeContext.Provider value={{cyRef}}>
      {children}
    </CytoscapeContext.Provider>
  )
}
