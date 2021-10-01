import React from 'react'

import { ModalCard, Button } from '@vkontakte/vkui'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'
import { EModalIds } from 'constants/modals'

export const CloseGameModal = ({ id }) => {
  const { pushPanel, setActiveModal } = useRouterService()

  return (
    <ModalCard
      id={id}
      header="Закончить игру?"
      actions={
        <React.Fragment>
          <Button
            mode="tertiary"
            onClick={() => {
              setActiveModal(null)
              pushPanel(EPanels.START_GAME)
            }}
          >
            Да
          </Button>
          <Button onClick={() => setActiveModal(null)}>Нет</Button>
        </React.Fragment>
      }
    ></ModalCard>
  )
}
