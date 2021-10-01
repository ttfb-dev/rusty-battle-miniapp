import React from 'react'

import { RouterServiceContext } from './RouterServiceContext'

export const useRouterService = () => {
  const {
    activePanel,
    popPanel,
    pushPanel,
    modalParams,
    activeModal,
    setActiveModal,
  } = React.useContext(RouterServiceContext)

  return {
    activePanel,
    popPanel,
    pushPanel,
    modalParams,
    activeModal,
    setActiveModal,
  }
}
