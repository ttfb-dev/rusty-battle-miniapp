import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { game } from 'store'

import {
  PanelHeader,
  Placeholder,
  Title,
  Button,
  Spinner,
} from '@vkontakte/vkui'

import { Panel } from 'components/Panel'
import { GAME_NAME } from 'constants/common'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'
import { RobotAvatar } from 'components/RobotAvatar'

export const StartGamePanel = ({ id }) => {
  const dispatch = useDispatch()
  const { pushPanel, setActiveModal } = useRouterService()

  const [isLoading, setIsLoading] = React.useState(false)

  const startGame = async () => {
    setIsLoading(true)
    await dispatch.sync(game.action.startGame())
    setIsLoading(false)

    pushPanel(EPanels.ASSEMBLY)
  }

  const bossName = useSelector((store) => store.general.bossName)
  const userId = useSelector((store) => store.general.userId)

  const actions = (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button
          size="m"
          disabled={isLoading}
          style={{ minWidth: '120px' }}
          onClick={startGame}
        >
          {isLoading ? <Spinner size="small" /> : 'Начать игру'}
        </Button>
      </div>
      <div>
        <Button
          size="m"
          mode="tertiary"
          onClick={() => pushPanel(EPanels.HELP)}
        >
          Правила
        </Button>
      </div>
    </div>
  )

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>{GAME_NAME}</PanelHeader>}
    >
      <Placeholder
        icon={<RobotAvatar slug={userId} />}
        header={
          <Title level="1" weight="semibold">
            Пора собрать робота
          </Title>
        }
        action={actions}
      >
        Собери робота и сразись
        <br />с повелителем свалки по имени
        <br />
        {bossName}
      </Placeholder>
    </Panel>
  )
}
