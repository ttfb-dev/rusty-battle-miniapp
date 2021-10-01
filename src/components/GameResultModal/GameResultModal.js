import React from 'react'

import {
  Avatar,
  Button,
  ModalPage,
  Placeholder,
  Separator,
} from '@vkontakte/vkui'
import { ModalHeader } from 'components/ModalHeader'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'

const VICTORY_DATA = {
  header: 'Ты победил!',
  description: (
    <React.Fragment>
      Твой робот уничтожил РобоБосса, продолжай в&nbsp;том&nbsp;же духе!
    </React.Fragment>
  ),
}
const LESION_DATA = {
  header: 'Победил РобоБосс!',
  description: (
    <React.Fragment>
      Босс уничтожил твоего робота, в&nbsp;следующий раз тебе повезет больше
    </React.Fragment>
  ),
}

export const GameResultModal = ({ id }) => {
  const { modalParams, setActiveModal, pushPanel } = useRouterService()

  const { isVictory, user = {} } = modalParams || {}
  const { header, description } = isVictory ? VICTORY_DATA : LESION_DATA

  const handleClose = () => {
    setActiveModal(null)
    pushPanel(EPanels.START_GAME)
  }

  return (
    <ModalPage
      id={id}
      header={<ModalHeader>Битва окончена</ModalHeader>}
      onClose={handleClose}
    >
      <Placeholder
        icon={
          <Avatar size={72} src={`https://robohash.org/${user.name}.png`} />
        }
        header={header}
        action={<Button mode="tertiary">Показать все ходы за партию</Button>}
      >
        {description}
      </Placeholder>

      <Separator />
      <div style={{ padding: '12px 16px' }}>
        <Button size="l" style={{ width: '100%' }} onClick={handleClose}>
          Завершить
        </Button>
      </div>
    </ModalPage>
  )
}
