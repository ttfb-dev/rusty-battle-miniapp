import React from 'react'

import { Icon16Like, Icon16Flash, Icon16Chevron } from '@vkontakte/icons'
import { Separator, Cell, Button } from '@vkontakte/vkui'

import { StatInfo } from 'components/StatInfo'

import './StatsBar.css'

export const StatsBar = ({ health, energy }) => {
  const before = (
    <ul className="StatsBar__allStats">
      <li className="StatsBar__stat">
        <StatInfo
          statType="health"
          icon={<Icon16Like />}
          value={health.value}
          aditionValue={health.aditionValue}
        />
      </li>
      <li className="StatsBar__stat">
        <StatInfo
          statType="energy"
          icon={<Icon16Flash />}
          value={energy.value}
          aditionValue={energy.aditionValue}
        />
      </li>
    </ul>
  )

  const after = (
    <Button
      className="StatsBar__button"
      mode="tertiary"
      hasHover={false}
      after={<Icon16Chevron />}
    >
      Мои предметы
    </Button>
  )

  return (
    <div>
      <Separator />
      <Cell hasHover={false} hasActive={false} before={before} after={after} />
      <Separator />
    </div>
  )
}
