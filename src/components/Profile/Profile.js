import React from 'react'

import { SimpleCell, Avatar } from '@vkontakte/vkui'
import { Icon24Chevron } from '@vkontakte/icons'
import { RobotAvatar } from 'components/RobotAvatar'

export const Profile = ({ user, effects, onClick }) => {
  return (
    <SimpleCell
      before={<RobotAvatar slug={user.slug} />}
      after={
        onClick && <Icon24Chevron style={{ color: 'var(--text_secondary)' }} />
      }
      description={effects}
      hoverMode={false}
      activeMode={false}
      onClick={onClick}
    >
      {user.name}
    </SimpleCell>
  )
}
