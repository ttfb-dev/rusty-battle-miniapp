import React from 'react'

import {
  Title,
  Caption,
  Button,
  Div,
  Separator,
  Spacing,
  FixedLayout,
} from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

import { Panel } from 'components/Panel'
import { Header } from 'components/Header'
import { StatusBar } from 'components/StatusBar'
import { StatsBar } from 'components/StatsBar'
import { Module } from 'components/Module'

import { Icon16Sync } from '@vkontakte/icons'

import { EModalIds } from 'constants/modals'
import { EPanels } from 'constants/panels'
import { EStatsTypes } from 'constants/stats'
import { ESlotsTypes, ESlotsTypesIn } from 'constants/slots'

import './AssemblyPanel.css'
import { useDispatch, useSelector } from 'react-redux'

import { game } from 'store'

export const AssemblyPanel = ({ id }) => {
  const modules = useSelector((store) => store.game.shuffle.modules)
  const round = useSelector((store) => store.game.shuffle.round)
  const robot = useSelector((store) => store.game.my_robot)
  const battle_id = useSelector((store) => store.game.battle_id)
  const dispatch = useDispatch()
  const { pushPanel } = useRouterService()

  const setModule = async (module_id, slot) => {
    let forceStart = false
    if (round === 10) {
      forceStart = true
    }
    await dispatch.sync(
      game.action.setModule({
        battle_id,
        module_id,
        slot,
        current_round_number: round,
      })
    )
    if (forceStart) {
      await startFight()
    }
  }

  const startFight = async () => {
    await dispatch.sync(game.action.startFight({ battle_id }))
    pushPanel(EPanels.FIGHT)
  }

  const { setActiveModal } = useRouterService()

  const isLastRound = round === 10
  //174
  return (
    <Panel id={id} header={<Header title="Сборка" />}>
      <div style={{ paddingTop: '174px' }} />

      <FixedLayout
        vertical="top"
        style={{ backgroundColor: 'var(--background_content)' }}
      >
        <StatusBar activeIndex={round - 1} />

        <div className="AssemblyPanel__descriptionContainer">
          <Title level="2" weight="semibold">
            Собери робота
          </Title>
          <Caption className="AssemblyPanel__description" level="1">
            Выбери модули из&nbsp;предложенных для установки
            их&nbsp;на&nbsp;робота и&nbsp;начала боя
          </Caption>
        </div>

        <StatsBar
          health={{
            value: robot.specifications.health.total,
            aditionValue:
              '+' +
              (robot.specifications.health.total -
                robot.specifications.health.base),
          }}
          energy={{
            value: robot.specifications.energy.total,
            aditionValue:
              '+' +
              (robot.specifications.energy.total -
                robot.specifications.energy.base),
          }}
          onClick={() => setActiveModal('inventory')}
        />
      </FixedLayout>

      {modules &&
        modules.map((module, index) => {
          const modules_installed = robot.modules.filter((robot_module) =>
            module.slots.includes(robot_module.slot)
          )

          return (
            <Module
              id={index + module.id}
              key={index + module.id}
              name={module.title}
              element={ESlotsTypes[module.slots.join(', ')]}
              description={module.description}
              slot={module.slots[0]}
              image={module.image}
              stats={[
                { type: EStatsTypes.energy, value: module.energy },
                { type: EStatsTypes.damage, value: module.damage },
              ]}
              actions={
                <React.Fragment>
                  {module.slots.map((slot) => {
                    const installed_module_in_slot = modules_installed.filter(
                      (robot_module) => robot_module.slot === slot
                    )
                    if (installed_module_in_slot.length === 0) {
                      return (
                        <Button
                          mode="primary"
                          onClick={() => {
                            setModule(module.id, slot)
                          }}
                        >
                          Установить {ESlotsTypesIn[slot]}
                        </Button>
                      )
                    }
                    return (
                      <Button
                        mode="secondary"
                        before={<Icon16Sync />}
                        onClick={() => {
                          setModule(module.id, slot)
                        }}
                      >
                        Заменить ({installed_module_in_slot[0].title})
                      </Button>
                    )
                  })}
                </React.Fragment>
              }
            />
          )
        })}

      <FixedLayout
        vertical="bottom"
        style={{
          padding: '14px 16px',
          backgroundColor: 'var(--background_content)',
        }}
      >
        {!isLastRound && round >= 2 && robot.modules.length >= 1 && (
          <>
            <Button
              stretched
              size="m"
              mode="tertiary"
              onClick={() => {
                startFight()
              }}
            >
              Начать бой раньше
            </Button>
            <Spacing size={12} />
            <Separator />
            <Spacing size={12} />
          </>
        )}
        <Button
          stretched
          size="m"
          mode={isLastRound ? 'primary' : 'secondary'}
          onClick={() => {
            setModule(null, null)
          }}
        >
          {isLastRound ? 'Начать бой' : 'Пропустить'}
        </Button>
      </FixedLayout>

      <div style={{ paddingTop: '125px' }} />
    </Panel>
  )
}
