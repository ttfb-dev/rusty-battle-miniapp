import { defineAction } from '@logux/actions';

const startGame = defineAction('game/start');
const setModule = defineAction('game/module_set');
const startFight = defineAction('game/start_fight');
const activateModule = defineAction('game/activate_module');
const deactivateModule = defineAction('game/deactivate_module');
const fightStep = defineAction('game/fight_step');

export { startGame, setModule, startFight, activateModule, deactivateModule, fightStep };
