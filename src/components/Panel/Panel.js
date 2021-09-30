import React from 'react'

import { Panel as PanelUi } from '@vkontakte/vkui'

export const Panel = ({ id, header, children }) => {
  return (
    <PanelUi id={id}>
      {header}
      {children}
    </PanelUi>
  )
}
