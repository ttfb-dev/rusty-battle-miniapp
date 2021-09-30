import { getGameProfile } from './action';

const initialState = {
  score: 0,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case getGameProfile.type + '_success':
      const { score } = payload;

      return {
        ...state,
        score,
      };

    default:
      return state;
  }
};

export { reducer };
