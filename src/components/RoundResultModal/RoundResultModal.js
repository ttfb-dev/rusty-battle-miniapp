import React from 'react'
import { useSelector } from 'react-redux'

import {
  Button,
  ModalPage,
  ModalPageHeader,
  Separator,
  Placeholder,
  Div,
} from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'
import { RoundHistory } from 'components/RoundHistory'
import { EStatsTypes } from 'constants/stats'

import styles from './RoundResultModal.module.scss'

export const RoundResultModal = ({ id }) => {
  const { setActiveModal } = useRouterService()

  const log = useSelector((state) => state.game.log || [])

  return (
    <ModalPage
      id={id}
      settlingHeight={100}
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
        <Placeholder>Никаких действий не совершалось</Placeholder>
      )}

        
        <Div className={styles.buttonContainer}>
          <Separator />
          <Button
            size="l"
            mode="primary"
            stretched
            onClick={() => setActiveModal(null)}
          >
            Продолжить
          </Button>
        </Div>
    </ModalPage>
  )
}
