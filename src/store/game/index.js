import { startGame, setModule, startFight, activateModule, deactivateModule, fightStep } from './action';
import { reducer } from './reducer';

const game = {
  action: { startGame, setModule, startFight, activateModule, deactivateModule, fightStep },
  reducer,
};

export { game };
