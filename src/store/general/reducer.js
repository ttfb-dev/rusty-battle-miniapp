import { setUserId } from './action';

const isDev = process.env.NODE_ENV === 'development';

const initialState = {
  userId: null,
  isDebug: isDev,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case setUserId.type:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export { reducer };
