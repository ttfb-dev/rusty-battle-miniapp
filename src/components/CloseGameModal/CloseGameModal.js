import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ModalCard, Button } from '@vkontakte/vkui'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'

import { game } from 'store'

export const CloseGameModal = ({ id }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const battle_id = useSelector((state) => state.game.battle_id)

  const onExit = () => {
    setLoading(true)
    dispatch.sync(game.action.forceFinish(battle_id)).finally(() => {
      setLoading(false)
      setActiveModal(null)
      pushPanel(EPanels.START_GAME)
    })
  }

  const { pushPanel, setActiveModal } = useRouterService()

  return (
    <ModalCard
      id={id}
      header="Закончить игру?"
      actions={
        <React.Fragment>
          <Button
            mode="tertiary"
            size="m"
            onClick={onExit}
            loading={loading}
          >
            Да
          </Button>
          <Button size="m" loading={loading} onClick={() => setActiveModal(null)}>Нет</Button>
        </React.Fragment>
      }
    ></ModalCard>
  )
}
