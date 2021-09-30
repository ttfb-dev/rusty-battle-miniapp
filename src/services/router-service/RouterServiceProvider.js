import React from 'react'

import { RouterServiceContext } from './RouterServiceContext'

export const RouterServiceProvider = ({ children, initPanel }) => {
  const [activeModal, setActiveModal] = React.useState(null)

  const [history, setHistory] = React.useState([initPanel])

  const activePanel = history[history.length - 1]

  const pushPanel = React.useCallback((newPanel) => {
    setHistory((oldHistory) => [...oldHistory, newPanel])
  }, [])

  const popPanel = React.useCallback(() => {
    setHistory((oldHistory) => oldHistory.slice(0, -1))
  }, [])

  const contextValue = React.useMemo(
    () => ({
      history,
      popPanel,
      pushPanel,
      activePanel,
      activeModal,
      setActiveModal,
    }),
    [history, activePanel, popPanel, pushPanel, activeModal, setActiveModal]
  )

  return (
    <RouterServiceContext.Provider value={contextValue}>
      {children}
    </RouterServiceContext.Provider>
  )
}
