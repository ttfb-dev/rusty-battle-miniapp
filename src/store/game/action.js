import { defineAction } from '@logux/actions';

const startGame = defineAction('game/start');
const setModule = defineAction('game/module_set');
const startFight = defineAction('game/start_fight');

export { startGame, setModule, startFight };
