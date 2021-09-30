import React from 'react'

import { Title, Caption, Button } from '@vkontakte/vkui'

import { Panel } from 'components/Panel'
import { Header } from 'components/Header'
import { StatusBar } from 'components/StatusBar'
import { StatsBar } from 'components/StatsBar'
import { Module } from 'components/Module'

import { EStatsTypes } from 'constants/stats'
import { ESlotsTypes, ESlotsTypesIn } from 'constants/slots'

import './AssemblyPanel.css'
import { useDispatch, useSelector } from 'react-redux'

import { game } from 'store';

export const AssemblyPanel = ({ id }) => {

  const modules = useSelector((store) => store.game.shuffle.modules)
  const round = useSelector((store) => store.game.shuffle.round)
  const robot = useSelector((store) => store.game.my_robot)
  const battle_id = useSelector((store) => store.game.battle_id)
  const dispatch = useDispatch()

  const setModule = (module_id, slot) => {
    dispatch.sync(game.action.setModule({battle_id, module_id, slot}))
  }

  return (
    <Panel id={id} header={<Header title="Сборка" />}>
      <StatusBar activeIndex={round} />

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
        health={{ value: robot.specifications.health.total, aditionValue: '+' + (robot.specifications.health.total - robot.specifications.health.base) }}
        energy={{ value: robot.specifications.energy.total, aditionValue: '+' + (robot.specifications.energy.total - robot.specifications.energy.base) }}
      />

      {modules && modules.map((module, index) => {

        const modules_installed = robot.modules.filter((robot_module) => module.slots.includes(robot_module.slot))

        return (<Module
          id={index + module.id}
          key={index + module.id}
          name={module.title}
          element={ESlotsTypes[module.slots.join(', ')]}
          description={module.description}
          stats={[
            { type: EStatsTypes.energy, value: module.energy * -1 },
            { type: EStatsTypes.damage, value: module.damage },
          ]}
          actions={
            <React.Fragment>
              {module.slots.map((slot) => {
                const installed_module_in_slot = modules_installed.filter((robot_module) => robot_module.slot === slot)
                if (installed_module_in_slot.length === 0) {
                  return (
                    <Button mode="primary" onClick={() => {setModule(module.id, slot)}}>Установить {ESlotsTypesIn[slot]}</Button>
                  ) 
                }
                return (
                  <Button mode="primary" onClick={() => {setModule(module.id, slot)}}>Заменить {installed_module_in_slot[0].title}</Button>
                )
              })}
            </React.Fragment>
          }
        />)
      })}
      
    </Panel>
  )
}
