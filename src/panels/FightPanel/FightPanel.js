import React from 'react'

import { Panel } from 'components/Panel'
import { useRouterService } from 'services/router-service'
import { useSelector } from 'react-redux'

import './FightPanel.css'

import {
  Div,
  PanelHeader,
} from '@vkontakte/vkui'
import { InventoryFight } from 'components/InventoryFight'

export const FightPanel = ({ id }) => {
  const { pushPanel } = useRouterService()

  const bossName = useSelector((store) => store.general.bossName)

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>Битва</PanelHeader>}
    >
      <Div>
        <InventoryFight />
      </Div>
    </Panel>
  )
}
