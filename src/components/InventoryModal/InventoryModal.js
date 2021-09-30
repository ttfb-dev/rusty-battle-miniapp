import React from 'react'

import {
  ModalPage,
  Group,
  Header,
  Placeholder,
  Caption,
  Spacing,
} from '@vkontakte/vkui'

import { EStatsTypes } from 'constants/stats'

import { useRouterService } from 'services/router-service'

import { Module } from 'components/Module'
import { ModalHeader } from 'components/ModalHeader'

const MODULES = [
  {
    title: 'Голова',
    module: {
      name: 'Лазер',
      element: 'Голова',
      description: 'В следующий ход восстанавливает 1 очко здоровья',
      stats: [
        { type: EStatsTypes.energy, value: 5 },
        { type: EStatsTypes.damage, value: 5 },
      ],
    },
  },
  {
    title: 'Ядро',
    module: {
      name: 'Лазер',
      element: 'Голова',
      description: 'В следующий ход восстанавливает 1 очко здоровья',
      stats: [
        { type: EStatsTypes.energy, value: 5 },
        { type: EStatsTypes.damage, value: 5 },
      ],
    },
  },
  {
    title: 'Руки',
    module: null,
  },
  {
    title: 'Ноги',
    module: {
      name: 'Лазер',
      element: 'Голова',
      description: 'В следующий ход восстанавливает 1 очко здоровья',
      stats: [
        { type: EStatsTypes.energy, value: 5 },
        { type: EStatsTypes.damage, value: 5 },
      ],
    },
  },
]

export const InventoryModal = ({ id }) => {
  const { setActiveModal } = useRouterService()

  const handleClose = () => setActiveModal(null)

  const moduleCount = MODULES.reduce(
    (acc, { module }) => (module ? acc + 1 : acc),
    0
  )

  return (
    <ModalPage
      id={id}
      header={<ModalHeader>Мои предметы</ModalHeader>}
      dynamicContentHeight
      onClose={handleClose}
    >
      {MODULES.map(({ title, module }, index) => (
        <Group
          key={index}
          header={<Header mode="secondary">{title.toUpperCase()}</Header>}
          separator="hide"
        >
          {module ? (
            <Module {...module} />
          ) : (
            <Placeholder>Оружие не добавлено</Placeholder>
          )}
        </Group>
      ))}
      <Group separator="hide">
        <Caption
          level="1"
          weight="regular"
          style={{ textAlign: 'center', color: 'var(--text_placeholder)' }}
        >
          {moduleCount} предмета
        </Caption>
        <Spacing />
      </Group>
    </ModalPage>
  )
}
