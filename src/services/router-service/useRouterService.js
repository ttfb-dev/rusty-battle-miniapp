import React from 'react'

import { RouterServiceContext } from './RouterServiceContext'

export const useRouterService = () => {
  const { activePanel, pushPanel } = React.useContext(RouterServiceContext)

  return { activePanel, pushPanel }
}
