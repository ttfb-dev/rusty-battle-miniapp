import { startGame } from './action';

const initialState = {
  battle_id: null,
};

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action;

  switch (type) {
    case startGame.type + '_success':
      const { battle_id } = payload;

      return {
        ...state,
        battle_id,
      };

    default:
      return state;
  }
};

export { reducer };
