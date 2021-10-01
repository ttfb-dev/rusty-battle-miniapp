import React from 'react'

import { Panel as PanelUi } from '@vkontakte/vkui'

export const Panel = ({ id, header, children, className }) => {
  return (
    <PanelUi id={id} className={className}>
      {header}
      {children}
    </PanelUi>
  )
}
