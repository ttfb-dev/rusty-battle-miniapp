import { defineAction } from '@logux/actions';

const startGame = defineAction('game/start');
const setModule = defineAction('game/module_set');
const startFight = defineAction('game/start_fight');
const activateModule = defineAction('game/activate_module');
const deactivateModule = defineAction('game/deactivate_module');
const fightStep = defineAction('game/fight_step');
const whereIAm = defineAction('game/where_i_am');
const forceFinish = defineAction('game/force_finish');
const loadGame = defineAction('game/load');
const initDone = defineAction('game/init_done');

export { 
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
};
