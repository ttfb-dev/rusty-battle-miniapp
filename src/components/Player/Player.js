import React from 'react'

import { SimpleCell, Avatar, Counter } from '@vkontakte/vkui'
import {
  Icon24User,
  Icon24Chevron,
  Icon16Like,
  Icon16Flash,
} from '@vkontakte/icons'

import { EStatsTypes } from 'constants/stats'

import './Player.css'

const ICONS = {
  [EStatsTypes.health]: <Icon16Like />,
  [EStatsTypes.energy]: <Icon16Flash />,
}

const PlayerStats = ({ type, options }) => {
  const { total, base, value } = options

  const list = []

  for (let i = 0; i < total; i++) {
    const lineType = i + 1 <= value ? 'fill' : 'empty'

    if (total !== base && i === base) {
      list.push(<li className="PlayerStats__dot" />)
    }

    list.push(
      <li className={`PlayerStats__item PlayerStats__item_type_${lineType}`} />
    )
  }

  return (
    <div className={`PlayerStats PlayerStats_${type}`}>
      <div className="PlayerStats__container">
        {ICONS[type]}
        <ul className="PlayerStats__list">{list}</ul>
        <Counter size="s">{total}</Counter>
      </div>
    </div>
  )
}

export const Player = ({ effects, user, specifications, onClick }) => {
  const { health, energy } = specifications

  return (
    <React.Fragment>
      <SimpleCell
        before={<Avatar size={48} src={user.image} />}
        after={
          onClick && (
            <Icon24Chevron style={{ color: 'var(--text_secondary)' }} />
          )
        }
        description={effects}
        hoverMode={false}
        activeMode={false}
        onClick={onClick}
      >
        {user.name}
      </SimpleCell>

      <PlayerStats type={EStatsTypes.health} options={health} />
      <PlayerStats type={EStatsTypes.energy} options={energy} />
    </React.Fragment>
  )
}
