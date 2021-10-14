import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { game } from 'store'

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  View,
  Group,
  Tabbar,
  TabbarItem,
  Epic,
} from '@vkontakte/vkui'

import {
  Icon56NewsfeedOutline,
  Icon28ServicesOutline,
  Icon28UserCircleOutline,
  Icon28ClipOutline,
  Icon24RobotOutline,
  Icon28InfoOutline,
  Icon24StarsOutline,
} from '@vkontakte/icons'

import { GAME_NAME } from 'constants/common'
import { StartGameView } from './views/StartGameView'

export const StartGamePanel = ({ id }) => {
  const dispatch = useDispatch()
  const [activeStory, setActiveStory] = useState('start_game')
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)

  return (
    <Panel
      id={id}
      header={<PanelHeader separator={false}>{GAME_NAME}</PanelHeader>}
    >
      <Epic
        activeStory={activeStory}
        tabbar={
          <Tabbar>
            <TabbarItem
              onClick={onStoryChange}
              selected={activeStory === 'leader_board'}
              data-story="leader_board"
              text="Лидеры"
            >
              <Icon24StarsOutline width={24} height={24} />
            </TabbarItem>
            <TabbarItem
              onClick={onStoryChange}
              selected={activeStory === 'start_game'}
              data-story="start_game"
              text="Главная"
            >
              <Icon24RobotOutline width={24} height={24} />
            </TabbarItem>
            <TabbarItem
              onClick={onStoryChange}
              selected={activeStory === 'rules'}
              data-story="rules"
              text="Правила"
            >
              <Icon28InfoOutline width={24} height={24} />
            </TabbarItem>
          </Tabbar>
        }
      >
        <View id="feed" activePanel="feed">
          <Panel id="feed">
            <PanelHeader left={<PanelHeaderBack />}>Новости</PanelHeader>
            <Group style={{ height: '1000px' }}>
              <Placeholder
                icon={<Icon56NewsfeedOutline width={56} height={56} />}
              />
            </Group>
          </Panel>
        </View>
        <View id="services" activePanel="services">
          <Panel id="services">
            <PanelHeader left={<PanelHeaderBack />}>Сервисы</PanelHeader>
            <Group style={{ height: '1000px' }}>
              <Placeholder
                icon={<Icon28ServicesOutline width={56} height={56} />}
              ></Placeholder>
            </Group>
          </Panel>
        </View>
        <StartGameView id="start_game" activePanel="start_game" />
        <View id="clips" activePanel="clips">
          <Panel id="clips">
            <PanelHeader left={<PanelHeaderBack />}>Клипы</PanelHeader>
            <Group style={{ height: '1000px' }}>
              <Placeholder
                icon={<Icon28ClipOutline width={56} height={56} />}
              ></Placeholder>
            </Group>
          </Panel>
        </View>
        <View id="profile" activePanel="profile">
          <Panel id="profile">
            <PanelHeader left={<PanelHeaderBack />}>Профиль</PanelHeader>
            <Group style={{ height: '1000px' }}>
              <Placeholder
                icon={<Icon28UserCircleOutline width={56} height={56} />}
              ></Placeholder>
            </Group>
          </Panel>
        </View>
      </Epic>
    </Panel>
  )
}
