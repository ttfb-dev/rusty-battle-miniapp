import React from 'react'

import { Avatar, Banner } from '@vkontakte/vkui'
import { Icon28MusicOutline } from '@vkontakte/icons'

import { EStatsNames } from 'constants/stats'

import './Module.css'

export const Module = ({ name, description, id, element, stats = [], actions }) => {
  const header = (
    <React.Fragment>
      <span>{name}</span>
      <span className="Module__element"> · {element}</span>
    </React.Fragment>
  )

  const subheader = stats.map(({ type, value }, index) => (
    <span className={`Module__stat Module__stat_type_${type}`}>
      {value} {EStatsNames[type]}{' '}
      {index !== stats.length - 1 ? <span> · </span> : ''}
    </span>
  ))

  return (
    <Banner
      key={id}
      before={
        <Avatar mode="image">
          <Icon28MusicOutline />
        </Avatar>
      }
      header={header}
      subheader={subheader}
      text={description}
      actions={actions}
    />
  )
}
