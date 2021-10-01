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
import { EModalIds } from 'constants/modals'

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

        <Button
          onClick={() =>
            setActiveModal(EModalIds.gameResult, {
              isVictory: false,
              user: { name: 'asd' },
            })
          }
        >
          test
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
        style={{ marginTop: '24.47368421vh' }}
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
