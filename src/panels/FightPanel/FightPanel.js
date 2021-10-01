import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Icon28CancelOutline } from '@vkontakte/icons'

import {
  Div,
  PanelHeader,
  PanelHeaderClose,
  Spacing,
  FixedLayout,
  Button,
  Separator,
  Spinner,
} from '@vkontakte/vkui'

import { InventoryFight } from 'components/InventoryFight'
import { Panel } from 'components/Panel'
import { Player } from 'components/Player'

import { EModalIds } from 'constants/modals'
import { EGameStatus } from 'constants/game'
import { useRouterService } from 'services/router-service'
import { game } from 'store'

import './FightPanel.css'
import { EPanels } from 'constants/panels'

export const FightPanel = ({ id }) => {
  const { pushPanel, setActiveModal } = useRouterService()

  const [isLoading, setIsLoading] = React.useState(false)

  const winner = useSelector((store) => store.game.winner)

  const dispatch = useDispatch()
  const bossName = useSelector((store) => store.general.bossName)
  const userId = useSelector((store) => store.general.user_id)
  const my_robot = useSelector((store) => store.game.my_robot)
  const boss = useSelector((store) => store.game.boss)
  const battle_id = useSelector((store) => store.game.battle_id)
  const activeModules = useSelector((state) =>
    state.game.my_robot.modules.filter((module) => module.status === 'active')
  )

  const log = useSelector((store) => store.game.log)
  const status = useSelector((store) => store.game.status)

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

  const fightStep = useMemo(() => {
    return () => {
      const active_module_ids = activeModules.map((module) => module.id)

      setIsLoading(true)

      dispatch.sync(
        game.action.fightStep({ battle_id, module_ids: active_module_ids })
      )
    }
  }, [activeModules, battle_id])

  const isInitGame = React.useRef(false)

  React.useEffect(() => {
    if (!isInitGame.current) {
      isInitGame.current = true

      return
    }

    setIsLoading(false)

    if (status === EGameStatus.fighting) {
      setActiveModal(EModalIds.roundResult)
    } else {
      setActiveModal(EModalIds.gameResult)
    }
  }, [status, log])

  return (
    <Panel
      id={id}
      className="FightPanel"
      header={
        <PanelHeader
          separator={false}
          left={
            <PanelHeaderClose onClick={() => setActiveModal(EModalIds.close)}>
              <Icon28CancelOutline />
            </PanelHeaderClose>
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
              effects={
                boss.specifications?.effects?.length
                  ? boss.specifications.effects.join(' · ')
                  : 'Нет эффектов'
              }
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
              effects={
                my_robot.specifications?.effects?.length
                  ? my_robot.specifications.effects.join(' · ')
                  : 'Нет эффектов'
              }
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
          <Button
            onClick={() => {
              !winner ? fightStep() : pushPanel(EPanels.START_GAME)
            }}
            size="l"
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {winner ? (
              'Конец игры'
            ) : isLoading ? (
              <Spinner size="small" />
            ) : (
              'Закончить ход'
            )}
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  )
}
