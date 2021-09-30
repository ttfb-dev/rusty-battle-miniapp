import React from 'react'

import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { useRouterService } from 'services/router-service'

export const Header = ({ title }) => {
  const { popPanel } = useRouterService()

  return (
    <PanelHeader
      separator={false}
      left={<PanelHeaderBack onClick={popPanel} />}
    >
      {title}
    </PanelHeader>
  )
}
