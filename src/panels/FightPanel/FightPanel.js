import React from 'react'

import { Panel } from 'components/Panel'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'
import { useSelector } from 'react-redux'

import './FightPanel.css'

import {
  Button,
  Div,
  PanelHeader,
  CardGrid,
  ContentCard,
  Spacing,
} from '@vkontakte/vkui'

export const FightPanel = ({ id }) => {
  const { pushPanel } = useRouterService()

  const bossName = useSelector((store) => store.general.bossName)

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>Битва</PanelHeader>}
    >
      <Div>
        FightPanel
      </Div>
    </Panel>
  )
}
