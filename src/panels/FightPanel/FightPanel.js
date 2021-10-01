import React from 'react'
import { useSelector } from 'react-redux'

import {
  Button,
  Div,
  PanelHeader,
  PanelHeaderClose,
  CardGrid,
  ContentCard,
  Spacing,
  FixedLayout,
  CellButton,
} from '@vkontakte/vkui'

import { Panel } from 'components/Panel'
import { Player } from 'components/Player'

import { EModalIds } from 'constants/modals'
import { useRouterService } from 'services/router-service'

import './FightPanel.css'

export const FightPanel = ({ id }) => {
  const { setActiveModal } = useRouterService()

  const bossName = useSelector((store) => store.general.bossName)

  return (
    <Panel
      id={id}
      className="FightPanel"
      header={
        <PanelHeader
          separator={false}
          left={
            <PanelHeaderClose onClick={() => setActiveModal(EModalIds.close)} />
          }
        >
          Битва
        </PanelHeader>
      }
    >
      <FixedLayout vertical="top">
        <Div className="FightPanel__header">
          <Div className="FightPanel__boss">
            <Player
              effects="Нет эффектов"
              user={{
                image: `https://robohash.org/${Math.random()}.png`,
                name: 'Переработанный Властелин',
              }}
              specifications={{
                health: {
                  total: 7,
                  base: 5,
                  value: 7,
                },
                energy: {
                  total: 14,
                  base: 9,
                  value: 14,
                },
              }}
              onClick={() => null}
            />
          </Div>
          <Spacing />
          <Div className="FightPanel__user">
            <Player
              effects="Нет эффектов"
              user={{
                image: `https://robohash.org/${Math.random()}.png`,
                name: 'S. Pivovarov',
              }}
              specifications={{
                health: {
                  total: 10,
                  base: 7,
                  value: 7,
                },
                energy: {
                  total: 14,
                  base: 10,
                  value: 12,
                },
              }}
            />
          </Div>
        </Div>
      </FixedLayout>

      <Div style={{ marginTop: '272px' }}>Content</Div>

      <FixedLayout vertical="bottom">
        <CellButton>
          <Button>Закончить ход</Button>
        </CellButton>
      </FixedLayout>
    </Panel>
  )
}
