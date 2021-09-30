import { badge, badgeRu, log } from '@logux/client';
import { badgeStyles } from '@logux/client/badge/styles';
import bridge from "@vkontakte/vk-bridge";

import { creds, env, misc } from './shared/config';
import { general, profile, store } from './store';

// store init
store.client.start();

if (creds.userId) {
  // если мы знаем айди, то сохраням его и запрашиваем инфо пользователя
  store.dispatch(general.action.setUserId({ userId: parseInt(creds.userId, 10) }));
  store.dispatch.sync(profile.action.getGameProfile());
  store.dispatch.sync(general.action.getBossName());
}

(async () => {
    
  // Init VK  Mini App
  bridge.send("VKWebAppInit");

})();

if (env.isDev) {
  log(store.client);
  badge(store.client, {
    messages: badgeRu,
    styles: {
      ...badgeStyles,
    },
    position: 'top-center',
  });
}
