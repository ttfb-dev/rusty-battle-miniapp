import React from 'react'

import { Counter } from '@vkontakte/vkui'
import { Icon16Like, Icon16Flash } from '@vkontakte/icons'

import { EStatsTypes } from 'constants/stats'

import { Profile } from 'components/Profile'

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
      <Profile user={user} effects={effects} onClick={onClick} />

      <PlayerStats type={EStatsTypes.health} options={health} />
      <PlayerStats type={EStatsTypes.energy} options={energy} />
    </React.Fragment>
  )
}
