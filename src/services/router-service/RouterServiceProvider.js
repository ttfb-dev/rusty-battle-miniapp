import React from 'react'

import { RouterServiceContext } from './RouterServiceContext'

export const RouterServiceProvider = ({ children, initPanel }) => {
  const [modalParams, setModalParams] = React.useState(null)
  const [activeModal, setActiveModalState] = React.useState(null)

  const [history, setHistory] = React.useState([initPanel])

  const activePanel = history[history.length - 1]

  const pushPanel = React.useCallback((newPanel) => {
    setHistory((oldHistory) => [...oldHistory, newPanel])
  }, [])

  const popPanel = React.useCallback(() => {
    setHistory((oldHistory) => oldHistory.slice(0, -1))
  }, [])

  const setActiveModal = React.useCallback((modalId, modalParams = null) => {
    setModalParams(modalParams)
    setActiveModalState(modalId)
  }, [])

  const contextValue = React.useMemo(
    () => ({
      history,
      popPanel,
      pushPanel,
      activePanel,
      modalParams,
      activeModal,
      setActiveModal,
    }),
    [
      history,
      activePanel,
      popPanel,
      pushPanel,
      modalParams,
      activeModal,
      setActiveModal,
    ]
  )

  return (
    <RouterServiceContext.Provider value={contextValue}>
      {children}
    </RouterServiceContext.Provider>
  )
}
