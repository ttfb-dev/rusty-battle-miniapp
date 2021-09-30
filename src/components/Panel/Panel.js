import React from 'react'

import { Panel as PanelUi, PanelHeader } from '@vkontakte/vkui'

export const Panel = ({ id, header, children }) => {
  return (
    <PanelUi id={id}>
      {header && <PanelHeader>{header}</PanelHeader>}
      {children}
    </PanelUi>
  )
}
