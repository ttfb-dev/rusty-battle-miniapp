import React from 'react'

import {
  Icon28Like,
  Icon28Flash,
  Icon28MagicWandOutline,
} from '@vkontakte/icons'

import { Group, Cell, Header } from '@vkontakte/vkui'

import { EStatsTypes } from 'constants/stats'

const Names = {
  [EStatsTypes.damage]: 'здоровья',
  [EStatsTypes.energy]: 'энергии',
}

const Captions = {
  [EStatsTypes.damage]: 'Получен урон',
  [EStatsTypes.energy]: 'На следующий ход',
  [EStatsTypes.effects]: 'Наложен эффект',
}

const Icons = {
  [EStatsTypes.damage]: <Icon28Like style={{ color: 'var(--dynamic_red)' }} />,
  [EStatsTypes.energy]: (
    <Icon28Flash style={{ color: 'var(--dynamic_purple)' }} />
  ),
  [EStatsTypes.effects]: <Icon28Flash />,
}

export const RoundHistory = ({ name, history }) => {
  return (
    <Group header={name && <Header>{name}</Header>}>
      {history.length ? (
        history.map(({ type, value }) => (
          <Cell multiline hoverMode={false} activeMode={false}>
            {type === EStatsTypes.effects ? value : `${value} ${Names[type]}`}
          </Cell>
        ))
      ) : (
        <Cell>Ничего не произошло</Cell>
      )}
    </Group>
  )
}
