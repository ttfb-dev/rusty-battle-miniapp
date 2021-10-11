import React from 'react'
import { useSelector } from 'react-redux'

import { ModalPage } from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

import { ModalHeader } from 'components/ModalHeader'
import { Inventory } from 'components/Inventory'

const DEFAUT_MODULES = []

export const InventoryModal = ({ id }) => {
  const modules = useSelector(
    (state) => state.game.my_robot.modules || DEFAUT_MODULES
  )

  const { setActiveModal } = useRouterService()

  const handleClose = () => setActiveModal(null)

  return (
    <ModalPage
      id={id}
      header={<ModalHeader>Мои предметы</ModalHeader>}
      settingHeight={100}
      onClose={handleClose}
    >
      <Inventory modules={modules} />
    </ModalPage>
  )
}
