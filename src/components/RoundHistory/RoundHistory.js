import React from 'react'

import styles from './RoundHistory.module.scss'

import { Group, Cell, Header } from '@vkontakte/vkui'

export const RoundHistory = ({ name, history }) => {
  return (
    <Group header={name && <Header>{name}</Header>}>
      {history.length ? (
        history.map(({ type, value }, index) => (
          <Cell key={index + value} multiline hoverMode={false} activeMode={false}>
            <div className={styles.row}>{value}</div>
          </Cell>
        ))
      ) : (
        <Cell>Ничего не произошло</Cell>
      )}
    </Group>
  )
}
