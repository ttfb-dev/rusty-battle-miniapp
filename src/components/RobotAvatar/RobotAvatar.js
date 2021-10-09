import React from 'react'

export const RobotAvatar = ({ slug, ...props }) => {
  return (
    <img
      {...props}
      src={`https://robohash.org/${slug}.png`}
    />
  )
}
