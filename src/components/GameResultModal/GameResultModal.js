import React from 'react'
import { useSelector } from 'react-redux'

import { RobotAvatar } from 'components/RobotAvatar'

import {
  Button,
  ModalPage,
  Placeholder,
  Separator,
} from '@vkontakte/vkui'
import { ModalHeader } from 'components/ModalHeader'
import { useRouterService } from 'services/router-service'
import { EPanels } from 'constants/panels'

export const GameResultModal = ({ id }) => {
  
  const { setActiveModal, pushPanel } = useRouterService()

  const winner = useSelector((store) => store.game.winner)
  const userId = useSelector((store) => store.general.userId)
  const bossName = useSelector((store) => store.general.bossName)

  const VICTORY_DATA = {
    header: 'Ты победил!',
    description: (
      <React.Fragment>
       Твой робот уничтожил босса <b>{bossName}</b>, продолжай в&nbsp;том&nbsp;же духе!
      </React.Fragment>
    ),
  }
  const LESION_DATA = {
    header: `Победил ${bossName}!`,
    description: (
      <React.Fragment>
        Босс уничтожил твоего робота, в&nbsp;следующий раз тебе повезет больше
      </React.Fragment>
    ),
  }

  const avatar =
    winner === 'core'
      ? bossName
      : userId
  const { header, description } = winner === 'core' ? LESION_DATA : VICTORY_DATA

  const handleClose = () => {
    pushPanel(EPanels.START_GAME)
    setActiveModal(null)
  }

  return (
    <ModalPage
      id={id}
      header={<ModalHeader>Битва окончена</ModalHeader>}
      onClose={handleClose}
    >
      <Placeholder icon={<RobotAvatar size={72} slug={avatar} />} header={header}>
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
