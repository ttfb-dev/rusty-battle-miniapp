import { CrossTabClient } from '@logux/client';
import { createStoreCreator } from '@logux/redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { creds } from '../shared/config';

import { general } from './general';
import { profile } from './profile';
import { game } from './game';

const client = new CrossTabClient({
  subprotocol: '1.0.0',
  server: 'wss://robots-game.ru:443',
  userId: creds.userId,
  token: creds.token,
});

const createStore = createStoreCreator(client);
let store = {}

store = createStore(
  combineReducers({
    general: general.reducer,
    profile: profile.reducer,
    game: game.reducer,
  }),
  store,
  composeWithDevTools(),
);

export { general, profile, game, store };
