import { setUserId, getBossName } from './action';

const isDev = process.env.NODE_ENV === 'development';

const initialState = {
  userId: null,
  isDebug: isDev,
  bossName: 'выбираем имя...'
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case setUserId.type:
      return { ...state, ...payload };

    case getBossName.type + '_success':
      const { name } = payload;

      return {
        ...state,
        bossName: name,
      }

    default:
      return state;
  }
};

export { reducer };
