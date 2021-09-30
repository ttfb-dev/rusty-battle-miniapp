import { defineAction } from '@logux/actions';

const startGame = defineAction('game/start');
const setModule = defineAction('game/module_set');

export { startGame, setModule };
