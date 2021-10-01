import React from 'react'

import { ModalPage, Group, Header, Separator, Button } from '@vkontakte/vkui'

import { Module } from 'components/Module'
import { ModalHeader } from 'components/ModalHeader'

import { EPanels } from 'constants/panels'
import { EStatsTypes } from 'constants/stats'
import { useRouterService } from 'services/router-service'

const MOCK = [
  [
    {
      title: 'Лазер',
      image: `https://robohash.org/1.png`,
      description: 'Наносит 1 урона',
      damage: 0,
      energy: 0,
    },
    {
      title: 'Ракетный кулак',
      image: `https://robohash.org/2.png`,
      description: 'Стан врага. Перезарядка 3 хода',
      damage: 4,
      energy: -4,
    },
  ],
  [
    {
      title: 'Лазер',
      image: `https://robohash.org/1.png`,
      description: 'Наносит 1 урона',
      damage: 0,
      energy: 0,
    },
    {
      title: 'Ракетный кулак',
      image: `https://robohash.org/2.png`,
      description: 'Стан врага. Перезарядка 3 хода',
      damage: 4,
      energy: -4,
    },
  ],
  [
    {
      title: 'Лазер',
      image: `https://robohash.org/1.png`,
      description: 'Наносит 1 урона',
      damage: 0,
      energy: 0,
    },
    {
      title: 'Ракетный кулак',
      image: `https://robohash.org/2.png`,
      description: 'Стан врага. Перезарядка 3 хода',
      damage: 4,
      energy: -4,
    },
  ],
]

export const GameHistoryModal = ({ id }) => {
  const { setActiveModal, pushPanel } = useRouterService()

  const handleClose = () => {
    setActiveModal(null)
    pushPanel(EPanels.START_GAME)
  }

  return (
    <ModalPage
      id={id}
      header={<ModalHeader onClose={handleClose}>Битва окончена</ModalHeader>}
      onClose={handleClose}
    >
      {MOCK.map((history, index) => (
        <Group header={<Header mode="secondary">{index + 1} ХОД</Header>}>
          {history.map(
            ({ title, image, description, energy, damage }, index) => (
              <Module
                isAvatar
                key={index}
                name={title}
                image={image}
                description={description}
                stats={[
                  { type: EStatsTypes.energy, value: energy },
                  { type: EStatsTypes.damage, value: damage },
                ]}
              />
            )
          )}
        </Group>
      ))}

      <Separator />
      <div style={{ padding: '12px 16px' }}>
        <Button size="l" style={{ width: '100%' }} onClick={handleClose}>
          Завершить
        </Button>
      </div>
    </ModalPage>
  )
}
