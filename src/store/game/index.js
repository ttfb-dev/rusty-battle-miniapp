import { 
  startGame, 
  setModule, 
  startFight, 
  activateModule, 
  deactivateModule, 
  fightStep, 
  whereIAm,
  forceFinish,
  loadGame,
  initDone,
} from './action';
import { reducer } from './reducer';

const game = {
  action: { 
    startGame, 
    setModule, 
    startFight, 
    activateModule, 
    deactivateModule, 
    fightStep, 
    whereIAm, 
    forceFinish,
    loadGame,
    initDone,
  },
  reducer,
};

export { game };
