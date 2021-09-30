import React from 'react'

import { Title, Caption } from '@vkontakte/vkui'

import { Panel } from 'components/Panel'
import { Header } from 'components/Header'
import { StatusBar } from 'components/StatusBar'
import { StatsBar } from 'components/StatsBar'

import './AssemblyPanel.css'

export const AssemblyPanel = ({ id }) => {
  return (
    <Panel id={id} header={<Header title="Сборка" />}>
      <StatusBar activeIndex={9} />

      <div className="AssemblyPanel__descriptionContainer">
        <Title level="2" weight="semibold">
          Собери робота
        </Title>
        <Caption className="AssemblyPanel__description" level="1">
          Выбери модули из&nbsp;предложенных для установки
          их&nbsp;на&nbsp;робота и&nbsp;начала боя
        </Caption>
      </div>

      <StatsBar
        health={{ value: 5, aditionValue: '+1' }}
        energy={{ value: 5, aditionValue: '+1' }}
      />
    </Panel>
  )
}
