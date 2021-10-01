import React from 'react'
import { useSelector } from 'react-redux'

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
  const { setActiveModal } = useRouterService()

  const log = useSelector((state) => state.game.log || [])

  return (
    <ModalPage
      id={id}
      header={<ModalPageHeader separator>Раунд завершен</ModalPageHeader>}
      onClose={() => setActiveModal(null)}
    >
      <Separator />

      {Boolean(log.length) ? (
        <RoundHistory
          history={log.map((item) => ({
            type: EStatsTypes.effects,
            value: item,
          }))}
        />
      ) : (
        <Placeholder>В этот ход нет эффектов</Placeholder>
      )}

      <footer className="RoundResultModal__footer">
        <Separator />
        <div style={{ padding: '12px 16px' }}>
          <Button
            size="l"
            style={{ width: '100%' }}
            onClick={() => setActiveModal(null)}
          >
            Продолжить
          </Button>
        </div>
      </footer>
    </ModalPage>
  )
}
