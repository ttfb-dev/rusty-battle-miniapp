import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import { EPanels } from 'constants/panels'
import { StartGamePanel } from 'panels/StartGamePanel'
import { HelpPanel } from 'panels/HelpPanel'
import { AssemblyPanel } from 'panels/AssemblyPanel'
import { useRouterService } from 'services/router-service'

import { store } from './store'

const App = () => {
  const [popout] = useState(null)

  const { activePanel } = useRouterService()

  return (
    <Provider store={store}>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel={activePanel} popout={popout}>
            <StartGamePanel id={EPanels.START_GAME} />
            <HelpPanel id={EPanels.HELP} />
            <AssemblyPanel id={EPanels.ASSEMBLY} />
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </Provider>
  )
}

export default App
