import React from 'react'

import { RouterServiceContext } from './RouterServiceContext'

export const RouterServiceProvider = ({ children }) => {
  const [history, setHistory] = React.useState()
  const [activePanel, setActivePanel] = React.useState()

  const pushPanel = React.useCallback((newPanel) => {
    setActivePanel(newPanel)
    setHistory(oldHistory => [...oldHistory, newPanel])
  }, [])

  const contextValue = React.useMemo(() => ({
    history,
    pushPanel,
    activePanel,
  }), [history, activePanel, pushPanel])

  return (
    <RouterServiceContext.Provider value={contextValue}>
      {children}
    </RouterServiceContext.Provider>
  )
}
