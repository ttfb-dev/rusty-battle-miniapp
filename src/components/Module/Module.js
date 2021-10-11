import React from 'react'

import { Avatar, Banner } from '@vkontakte/vkui'

import { ESlotsIds } from 'constants/slots'
import { EStatsNames } from 'constants/stats'

import bodyPng from 'assets/details/body.png'
import headPng from 'assets/details/head.png'
import lHandPng from 'assets/details/l-hand.png'
import rHandPng from 'assets/details/r-hand.png'
import legsPng from 'assets/details/legs.png'
import trashPng from 'assets/details/trash.png'

import styles from './Module.module.scss'

const STATIC_IMAGES = {
  [ESlotsIds.head]: headPng,
  [ESlotsIds.core]: bodyPng,
  [ESlotsIds.hand_l]: lHandPng,
  [ESlotsIds.hand_r]: rHandPng,
  [ESlotsIds.foot]: legsPng,
}

export const Module = ({
  name,
  description,
  id,
  slot,
  image,
  element,
  stats = [],
  actions,
  isAvatar,
}) => {
  const header = (
    <React.Fragment>
      <p className={styles.name} >{name}
        <span className={styles.element}> · {element}</span>
      </p>
    </React.Fragment>
  )

  const text = (
    <p className={styles.description} >{description}</p>
  )

  const filtred_stats = stats.filter(({ value }) => value)

  const subheader = filtred_stats.map(({ type, value }, index) => {
    let className = '';
    switch(type) {
      case 'energy':
        className = styles.stat_type_energy;
        break;
      case 'health':
        className = styles.stat_type_health;
        break;
      case 'damage':
        className = styles.stat_type_damage;
        break;
    }
    return (<span key={index} className={className}>
        {EStatsNames[type]}: {value}
        {index !== filtred_stats.length - 1 ? <span> · </span> : ''}
      </span>
    )
  })

  return (
    <Banner
      key={id}
      before={
        <Avatar
          mode={isAvatar ? 'default' : 'image'}
          src={image || STATIC_IMAGES[slot] || trashPng}
        ></Avatar>
      }
      header={header}
      subheader={subheader}
      text={text}
      actions={actions}
    />
  )
}
