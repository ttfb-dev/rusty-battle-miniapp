import { startGame, setModule, startFight } from './action';
import { reducer } from './reducer';

const game = {
  action: { startGame, setModule, startFight },
  reducer,
};

export { game };
