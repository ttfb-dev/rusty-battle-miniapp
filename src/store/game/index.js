import { startGame, setModule, startFight, activateModule, deactivateModule } from './action';
import { reducer } from './reducer';

const game = {
  action: { startGame, setModule, startFight, activateModule, deactivateModule },
  reducer,
};

export { game };
