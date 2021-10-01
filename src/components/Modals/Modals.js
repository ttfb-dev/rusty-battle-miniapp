import React from 'react'

import { ModalRoot } from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

import { InventoryModal } from 'components/InventoryModal'
import { BossInventoryModal } from 'components/BossInventoryModal'
import { CloseGameModal } from 'components/CloseGameModal'
import { RoundResultModal } from 'components/RoundResultModal'
import { GameResultModal } from 'components/GameResultModal'
import { GameHistoryModal } from 'components/GameHistoryModal'
import { EModalIds } from 'constants/modals'

export const Modals = () => {
  const { activeModal, setActiveModal } = useRouterService()

  return (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <InventoryModal id={EModalIds.inventory} />
      <BossInventoryModal id={EModalIds.bossInventory} />
      <RoundResultModal id={EModalIds.roundResult} />
      <CloseGameModal id={EModalIds.close} />
      <GameResultModal id={EModalIds.gameResult} />
      <GameHistoryModal id={EModalIds.gameHistory} />
    </ModalRoot>
  )
}
