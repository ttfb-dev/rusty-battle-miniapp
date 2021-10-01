import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Div } from '@vkontakte/vkui'
import { Icon16Done } from '@vkontakte/icons';

import { Module } from 'components/Module'

import { EStatsTypes } from 'constants/stats'
import { ESlotsTypes } from 'constants/slots'

import { game } from 'store'

const DEFAUT_MODULES = []

export const InventoryFight = ({ id }) => {
  const installed_modules = useSelector(
    (state) => state.game.my_robot.modules || DEFAUT_MODULES
  )
  const my_robot = useSelector((state) => state.game.my_robot)
  const dispatch = useDispatch()
  const activeModules = useSelector((state) => state.game.my_robot.modules.filter((module) => module.status === 'active'));

  const usedEnergy = useMemo(() => {
    let energy = 0;
    activeModules.forEach((module) => {
      if (module.status === 'active') {
        energy += module.energy
      }
    })
    return energy;
  }, [activeModules])

  const remaningEnergy = useMemo(() => {
    return my_robot.specifications.energy.value - usedEnergy;
  }, [usedEnergy, my_robot])

  const activateModule = (id) => {
    dispatch(game.action.activateModule({id}))
  }
  const deactivateModule = (id) => {
    dispatch(game.action.deactivateModule({id}))
  }

  return (
    <>
      <Div>{`Осталось ${remaningEnergy}`}</Div>
      {installed_modules &&
        installed_modules.map((module, index) => {
          let button;

          if (module.status === 'active') {
            button = <Button before={<Icon16Done />} mode='secondary' onClick={() => {deactivateModule(module.id)}}>Выбран</Button>
          } else if ((module.status === '' || module.status === 'ready') && remaningEnergy >= module.energy) {
            button = <Button mode='primary' onClick={() => {activateModule(module.id)}}>Использовать</Button>
          } else if (module.status === 'disabled' || remaningEnergy < module.energy) {
            button = <Button mode='primary' disabled onClick={() => {activateModule(module.id)}}>Использовать</Button>
          }

          return (<Module
            id={index + module.id}
            key={index + module.id}
            name={module.title}
            element={ESlotsTypes[module.slot]}
            description={module.description}
            stats={[
              { type: EStatsTypes.energy, value: module.energy },
              { type: EStatsTypes.damage, value: module.damage },
            ]}
            actions={
              <React.Fragment>
                {button}
              </React.Fragment>
            }
          />)
      })}
    </>
  )
}
