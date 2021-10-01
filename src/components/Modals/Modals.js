import React from 'react'

import { ModalRoot } from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

import { InventoryModal } from 'components/InventoryModal'
import { CloseGameModal } from 'components/CloseGameModal'
import { EModalIds } from 'constants/modals'

export const Modals = () => {
  const { activeModal, setActiveModal } = useRouterService()

  return (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <InventoryModal id={EModalIds.inventory} />
      <CloseGameModal id={EModalIds.close} />
    </ModalRoot>
  )
}
