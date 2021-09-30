import { startGame } from './action';
import { reducer } from './reducer';

const game = {
  action: { startGame },
  reducer,
};

export { game };
