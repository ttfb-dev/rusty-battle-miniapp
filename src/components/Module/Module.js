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

import './Module.css'

const STATIC_IMAGES = {
  [ESlotsIds.head]: headPng,
  [ESlotsIds.core]: bodyPng,
  [ESlotsIds.hand_l]: lHandPng,
  [ESlotsIds.hand_r]: rHandPng,
  [ESlotsIds.feet]: legsPng,
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
}) => {
  const header = (
    <React.Fragment>
      <span>{name}</span>
      <span className="Module__element"> · {element}</span>
    </React.Fragment>
  )

  const filtred_stats = stats.filter(({ value }) => value)

  const subheader = filtred_stats.map(({ type, value }, index) => (
    <span key={index} className={`Module__stat Module__stat_type_${type}`}>
      {EStatsNames[type]}: {value}
      {index !== filtred_stats.length - 1 ? <span> · </span> : ''}
    </span>
  ))
  console.log(slot)
  return (
    <Banner
      key={id}
      before={
        <Avatar
          mode="image"
          src={image || STATIC_IMAGES[slot] || trashPng}
        ></Avatar>
      }
      header={header}
      subheader={subheader}
      text={description}
      actions={actions}
    />
  )
}
