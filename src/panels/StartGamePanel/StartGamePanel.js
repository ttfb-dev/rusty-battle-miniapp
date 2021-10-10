import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { game } from 'store'

import {
  PanelHeader,
  Placeholder,
  Title,
  Group,
  CellButton,
  Spinner,
} from '@vkontakte/vkui'

import { Panel } from 'components/Panel'
import { GAME_NAME } from 'constants/common'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'
import { RobotAvatar } from 'components/RobotAvatar'
import { EGameStatus } from 'constants/game'

export const StartGamePanel = ({ id }) => {
  const dispatch = useDispatch()
  const { pushPanel, setActiveModal } = useRouterService()

  const isInitializing = useSelector((state) => state.game.loading)

  const [isLoading, setIsLoading] = useState(false)

  const battle_id = useSelector((state) => state.game.battle_id)
  const status = useSelector((state) => state.game.status)

  const startGame = async () => {
    setIsLoading(true)
    await dispatch.sync(game.action.startGame())
    setIsLoading(false)

    pushPanel(EPanels.ASSEMBLY)
  }

  const backToGame = async () => {
    setIsLoading(true)
    await dispatch.sync(game.action.loadGame({battle_id}))
    setIsLoading(false)

    if (status === EGameStatus.arming) {
      pushPanel(EPanels.ASSEMBLY)
    } else if (status === EGameStatus.fight) {
      pushPanel(EPanels.FIGHT)
    }
  }

  const forceFinish = async () => {
    setIsLoading(true)
    await dispatch.sync(game.action.forceFinish({battle_id}))
    setIsLoading(false)
  }

  const bossName = useSelector((store) => store.general.bossName)
  const userId = useSelector((store) => store.general.userId)

  const actions = (
    <>
      { battle_id 
        ? <Group>
            <CellButton disabled={isLoading} centered mode="primary" onClick={backToGame} >Вернуться в битву</CellButton>
            <CellButton disabled={isLoading} centered mode="danger" onClick={forceFinish}>Покинуть</CellButton>
            <CellButton centered onClick={() => pushPanel(EPanels.HELP)}>Правила</CellButton>
          </Group>
        : <Group>
            <CellButton disabled={isLoading} centered mode="primary" onClick={startGame}>Начать игру</CellButton>
            <CellButton >&nbsp;</CellButton>
            <CellButton centered onClick={() => pushPanel(EPanels.HELP)}>Правила</CellButton>
          </Group>
      }
    </>
  )

  const action = isInitializing 
      ? <Spinner />
      : actions

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>{GAME_NAME}</PanelHeader>}
    >
      <Placeholder
        icon={<RobotAvatar slug={userId} size={96} />}
        style={{marginTop: "10vh"}}
        header={
          <Title level="1" weight="semibold">
            Пора собрать робота
          </Title>
        }
        action={action}
      >
        Собери робота и сразись
        <br />с повелителем свалки по имени
        <br />
        {bossName}
      </Placeholder>
    </Panel>
  )
}
