import React from 'react'

import { Panel } from 'components/Panel'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'
import { useSelector } from 'react-redux'

import './HelpPanel.css'

import {
  Button,
  Div,
  PanelHeader,
  CardGrid,
  ContentCard,
  Spacing,
} from '@vkontakte/vkui'

export const HelpPanel = ({ id }) => {
  const { pushPanel } = useRouterService()

  const bossName = useSelector((store) => store.general.bossName)

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>Правила</PanelHeader>}
    >
      <Div>
        <CardGrid size="l">
          <ContentCard
            header="1. Собери робота"
            caption="В течение 10 раундов ты будешь находить случайные модули, из них необходимо надеть не более 5"
          />
          <ContentCard
            header={`2. Победи робота ${bossName}`}
            caption="Победи в пошаговой битве, используя все возможности установленных модулей"
          />
        </CardGrid>
      </Div>
      <Button
        stretched
        size="l"
        className="HelpPanel__button_back"
        onClick={() => {
          pushPanel(EPanels.START_GAME)
        }}
      >
        Понятно
      </Button>
    </Panel>
  )
}
