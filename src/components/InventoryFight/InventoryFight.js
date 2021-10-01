import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Div } from '@vkontakte/vkui'
import { Icon16Done } from '@vkontakte/icons'

import { Module } from 'components/Module'

import { EStatsTypes } from 'constants/stats'
import { ESlotsTypes } from 'constants/slots'

import { game } from 'store'

const DEFAUT_MODULES = []

export const InventoryFight = ({ id, remainingEnergy }) => {
  const installed_modules = useSelector(
    (state) => state.game.my_robot.modules || DEFAUT_MODULES
  )
  const dispatch = useDispatch()

  const activateModule = (id) => {
    dispatch(game.action.activateModule({ id }))
  }
  const deactivateModule = (id) => {
    dispatch(game.action.deactivateModule({ id }))
  }

  return (
    <>
      {installed_modules &&
        installed_modules.map((module, index) => {
          let button
          if (module.energy === 0) {
            button = <Button before={<Icon16Done />} disabled mode='secondary'>Выбран</Button>
          } else if (module.status === 'active') {
            button = <Button before={<Icon16Done />} mode='secondary' onClick={() => {deactivateModule(module.id)}}>Выбран</Button>
          } else if ((module.status === '' || module.status === 'ready') && remainingEnergy >= module.energy) {
            button = <Button mode='primary' onClick={() => {activateModule(module.id)}}>Использовать</Button>
          } else if (module.status === 'disabled' || remainingEnergy < module.energy) {
            button = <Button mode='primary' disabled onClick={() => {activateModule(module.id)}}>Использовать</Button>
          }

          return (
            <Module
              id={index + module.id}
              key={index + module.id}
              name={module.title}
              element={ESlotsTypes[module.slot]}
              description={module.description}
              slot={module.slot}
              image={module.image}
              stats={[
                { type: EStatsTypes.energy, value: module.energy },
                { type: EStatsTypes.damage, value: module.damage },
              ]}
              actions={<React.Fragment>{button}</React.Fragment>}
            />
          )
        })}
    </>
  )
}
