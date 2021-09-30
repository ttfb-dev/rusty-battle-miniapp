import React from 'react'
import { useDispatch } from 'react-redux'
import { game } from 'store'

import { Panel } from 'components/Panel'

export const StartGamePanel = ({ id }) => {

  const dispatch = useDispatch()

  const startGame = () => {
    dispatch.sync(game.action.startGame())
  }

  return (
    <Panel id={id} header="StartGame">
      <h1>StartGame</h1>
    </Panel>
  )
}
