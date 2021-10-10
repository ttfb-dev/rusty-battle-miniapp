import React from 'react'
import md5 from 'md5'
import { Avatar } from '@vkontakte/vkui'

export const RobotAvatar = ({ slug, ...props }) => {
  return (
    <Avatar
      {...props}
      src={`https://robohash.org/${md5(String(slug))}.png`}
    />
  )
}
