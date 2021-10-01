import React from 'react'
import { useSelector } from 'react-redux'

import { ModalPage } from '@vkontakte/vkui'

import { useRouterService } from 'services/router-service'

import { ModalHeader } from 'components/ModalHeader'
import { Inventory } from 'components/Inventory'
import { Profile } from 'components/Profile'

const DEFAUT_MODULES = []

export const BossInventoryModal = ({ id }) => {
  const bossName = useSelector((store) => store.general.bossName)

  const modules = useSelector(
    (state) => state.game.boss.modules || DEFAUT_MODULES
  )

  const { setActiveModal } = useRouterService()

  const handleClose = () => setActiveModal(null)

  return (
    <ModalPage
      id={id}
      header={<ModalHeader>{bossName}</ModalHeader>}
      dynamicContentHeight
      onClose={handleClose}
    >
      <Profile
        effects="Нет эффектов"
        user={{
          image: `https://robohash.org/${bossName}.png`,
          name: bossName,
        }}
      />

      <Inventory modules={modules} />
    </ModalPage>
  )
}
