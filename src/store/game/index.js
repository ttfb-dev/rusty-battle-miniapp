import { startGame, setModule } from './action';
import { reducer } from './reducer';

const game = {
  action: { startGame, setModule },
  reducer,
};

export { game };
