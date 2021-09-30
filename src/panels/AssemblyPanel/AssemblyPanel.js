import React from 'react'

import { Panel } from 'components/Panel'
import { Header } from 'components/Header'
import { StatusBar } from 'components/StatusBar'

export const AssemblyPanel = ({ id }) => {
  return (
    <Panel id={id} header={<Header title="Сборка" />}>
      <StatusBar activeIndex={9} />
    </Panel>
  )
}
