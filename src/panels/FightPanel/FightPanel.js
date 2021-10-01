import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import {
  Div,
  PanelHeader,
  PanelHeaderClose,
  Spacing,
  FixedLayout,
  Button,
  Cell,
  Separator,
} from '@vkontakte/vkui'

import { InventoryFight } from 'components/InventoryFight'
import { Panel } from 'components/Panel'
import { Player } from 'components/Player'

import { EModalIds } from 'constants/modals'
import { useRouterService } from 'services/router-service'
import { general, game } from 'store'

import './FightPanel.css'

export const FightPanel = ({ id }) => {
  const { setActiveModal } = useRouterService()

  const bossName = useSelector((store) => store.general.bossName)
  const userId = useSelector((store) => store.general.user_id)
  const my_robot = useSelector((store) => store.game.my_robot)
  const boss = useSelector((store) => store.game.boss)
  const activeModules = useSelector((state) =>
    state.game.my_robot.modules.filter((module) => module.status === 'active')
  )

  const usedEnergy = useMemo(() => {
    let energy = 0
    activeModules.forEach((module) => {
      if (module.status === 'active') {
        energy += module.energy
      }
    })
    return energy
  }, [activeModules])

  const remainingEnergy = useMemo(() => {
    return my_robot.specifications.energy.value - usedEnergy
  }, [usedEnergy, my_robot])

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
                image: `https://robohash.org/${bossName}.png`,
                name: bossName,
              }}
              specifications={{
                health: { ...boss.specifications.health },
                energy: { ...boss.specifications.energy },
              }}
              onClick={() => setActiveModal(EModalIds.bossInventory)}
            />
          </Div>
          <Spacing />
          <Div className="FightPanel__user">
            <Player
              effects="Нет эффектов"
              user={{
                image: `https://robohash.org/${userId}.png`,
                name: 'Мой робот',
              }}
              specifications={{
                health: { ...my_robot.specifications.health },
                energy: {
                  ...my_robot.specifications.energy,
                  value: remainingEnergy,
                },
              }}
            />
          </Div>
        </Div>
      </FixedLayout>

      <Div
        style={{
          padding: '0',
          marginTop: '272px',
          marginBottom: '69px',
        }}
      >
        <InventoryFight remainingEnergy={remainingEnergy} />
      </Div>

      <FixedLayout
        vertical="bottom"
        style={{ backgroundColor: 'var(--background_content)' }}
      >
        <Separator />
        <Div style={{ padding: '12px 16px' }}>
          <Button size="l" style={{ width: '100%' }}>
            Закончить ход
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  )
}
