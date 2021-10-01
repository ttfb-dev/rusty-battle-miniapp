import React from 'react'
import plural from 'plural-ru'

import { Group, Header, Placeholder, Caption, Spacing } from '@vkontakte/vkui'

import { Module } from 'components/Module'

import { EStatsTypes } from 'constants/stats'
import { ESlotsTypes } from 'constants/slots'
import { ESlotsIds, ESlotsSections } from 'constants/slots'

const SECTIONS = {
  [ESlotsSections.head]: {
    title: 'Голова',
    slotIds: [ESlotsIds.head],
  },
  [ESlotsSections.core]: {
    title: 'Ядро',
    slotIds: [ESlotsIds.core],
  },
  [ESlotsSections.hands]: {
    title: 'Руки',
    slotIds: [ESlotsIds.hand_l, ESlotsIds.hand_r],
  },
  [ESlotsSections.feet]: {
    title: 'Ноги',
    slotIds: [ESlotsIds.feet],
  },
}

export const Inventory = ({ modules = [] }) => {
  const getSlotModules = (sectionId) => {
    const { title, slotIds } = SECTIONS[sectionId]
    const modulesOnSection = modules.filter((module) =>
      slotIds.includes(module.slot)
    )

    return (
      <Group
        header={<Header mode="secondary">{title.toUpperCase()}</Header>}
        separator="hide"
      >
        {modulesOnSection.length ? (
          modulesOnSection.map(
            ({ id, slot, title, description, image, energy, damage }) => (
              <Module
                key={id}
                name={title}
                slot={slot}
                image={image}
                description={description}
                element={ESlotsTypes[slot]}
                stats={[
                  { type: EStatsTypes.energy, value: energy },
                  { type: EStatsTypes.damage, value: damage },
                ].filter(({ value }) => Boolean(value))}
              />
            )
          )
        ) : (
          <Placeholder>Модули не добавлены</Placeholder>
        )}
      </Group>
    )
  }

  return (
    <React.Fragment>
      {getSlotModules(ESlotsSections.head)}
      {getSlotModules(ESlotsSections.core)}
      {getSlotModules(ESlotsSections.hands)}
      {getSlotModules(ESlotsSections.feet)}

      <Group separator="hide">
        <Caption
          level="1"
          weight="regular"
          style={{ textAlign: 'center', color: 'var(--text_placeholder)' }}
        >
          {!modules.length
            ? 'Нет предметов'
            : `${modules.length} ${plural(
                modules.length,
                'предмет',
                'предмета',
                'предметов'
              )}`}
        </Caption>
        <Spacing />
      </Group>
    </React.Fragment>
  )
}
