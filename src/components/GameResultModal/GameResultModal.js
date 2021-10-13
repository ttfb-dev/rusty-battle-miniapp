import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
import { game } from 'store'

function declOfNum(number, titles) {  
  const cases = [2, 0, 1, 1, 1, 2];  
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

export const GameResultModal = ({ id }) => {
  
  const { setActiveModal, pushPanel } = useRouterService()

  const dispatch = useDispatch()

  const winner = useSelector((store) => store.game.winner)
  const points = useSelector((store) => store.game.points)
  const userId = useSelector((store) => store.general.userId)
  const bossName = useSelector((store) => store.general.bossName)

  const VICTORY_DATA = {
    header: 'Ты победил!',
    description: (
      <React.Fragment>
       Твой робот уничтожил босса <b>{bossName}</b>, продолжай в&nbsp;том&nbsp;же духе!<br />
       Твой результат: {points} {declOfNum(points,  ['очко', 'очка', 'очков'])}
      </React.Fragment>
    ),
  }
  const LESION_DATA = {
    header: `Победил ${bossName}!`,
    description: (
      <React.Fragment>
        Босс уничтожил твоего робота, в&nbsp;следующий раз тебе повезет больше<br />
       Твой результат: {points} {declOfNum(points,  ['очко', 'очка', 'очков'])}
      </React.Fragment>
    ),
  }

  const avatar =
    winner === 'core'
      ? bossName
      : userId
  const { header, description } = winner === 'core' ? LESION_DATA : VICTORY_DATA

  const handleClose = () => {
    dispatch.sync(game.action.whereIAm()).finally(() => {
      pushPanel(EPanels.START_GAME)
      setActiveModal(null)
    })
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
