import React from 'react'
import { useDispatch } from 'react-redux'
import { game } from 'store'

import { Panel } from 'components/Panel'

export const StartGamePanel = ({ id }) => {

  const dispatch = useDispatch()

  const startGame = () => {
    dispatch.sync(game.action.startGame()).then(() => {
      console.log('then')
    }).catch(() => {
      console.log('catch')
    }).finally(() => {
      console.log('finally')
    })
  }

  return (
    <Panel id={id} header="StartGame">
      <h1 onClick={startGame}>StartGame</h1>
    </Panel>
  )
}
