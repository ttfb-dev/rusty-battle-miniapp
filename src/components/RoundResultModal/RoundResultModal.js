import React from 'react'

import {
  Button,
  ModalPage,
  ModalPageHeader,
  Separator,
  Placeholder,
} from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'
import { RoundHistory } from 'components/RoundHistory'
import { EStatsTypes } from 'constants/stats'

import './RoundResultModal.css'

const RESULT = {
  level: 1,
  user: {
    name: 'Твой робот',
    history: [
      { type: EStatsTypes.damage, value: -5 },
      { type: EStatsTypes.energy, value: -7 },
    ],
  },
  boss: {
    name: 'РобоБосс',
    history: [
      {
        type: EStatsTypes.effects,
        value: 'Следующий атакующий модуль наносит на 1 урона больше',
      },
    ],
  },
}

export const RoundResultModal = ({ id }) => {
  const { modalParams, setActiveModal } = useRouterService()

  const { level } = modalParams || {}

  return (
    <ModalPage
      id={id}
      header={<ModalPageHeader separator>{level} раунд</ModalPageHeader>}
      onClose={() => setActiveModal(null)}
    >
      <Separator />

      {!Boolean(RESULT.user.history.length) &&
        !Boolean(RESULT.boss.history.length) && (
          <Placeholder>В этот ход нет эффектов</Placeholder>
        )}

      {Boolean(RESULT.user.history.length) && <RoundHistory {...RESULT.user} />}
      {Boolean(RESULT.boss.history.length) && <RoundHistory {...RESULT.boss} />}

      <footer className="RoundResultModal__footer">
        <Separator />
        <div style={{ padding: '12px 16px' }}>
          <Button size="l" style={{ width: '100%' }}>
            Продолжить
          </Button>
        </div>
      </footer>
    </ModalPage>
  )
}
