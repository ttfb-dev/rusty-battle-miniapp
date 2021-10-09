import {
  startGame,
  startFight,
  activateModule,
  deactivateModule,
  fightStep,
} from './action'

const initialState = {
  battle_id: null,
  status: null,
  shuffle: {
    round: 0,
    modules: [],
  },
  status: null,
  log: [],
  my_robot: {
    specifications: {
      health: {
        total: 0,
        base: 0,
        value: 0,
      },
      energy: {
        total: 0,
        base: 0,
        value: 0,
      },
    },
    effects: [],
    modules: [],
  },
  boss: {
    specifications: {
      health: {
        total: 0,
        base: 0,
        value: 0,
      },
      energy: {
        total: 0,
        base: 0,
        value: 0,
      },
    },
    effects: [],
    modules: [],
  },
}

/** status
 * in_progress - этап сбора модулей
 * in_battle - сражение
 * finish - закончено
 */

/** module.status
 * ready - можно активировать
 * active - активирован
 * disabled - заблокирован: нельзя активировать
 */

/* shuffle.modules[] :
{
  id: '',
  title: '',
  description: '',
  energy: 0,
  energy_add: 0,
  health_add: 0,
  damage: 0,
  image: '',
  slots: [],
}
*/

/* robot.modules[] :
{
  id: '',
  title: '',
  description: '',
  energy: 0,
  energy_add: 0,
  health_add: 0,
  damage: 0,
  status: '',
  image: '',
  slot: 'head',
}
*/

/** slots:
  'hand_l';
  'hand_r';
  'head';
  'core';
  'foot';
 */

/* robot.effects[] :
{
  id: '',
  title: '',
  description: '',
  image: '',
}
*/

const reducer = (state = initialState, action) => {
  const { type, ...payload } = action

  switch (type) {
    case startGame.type + '_success':
      return {
        ...state,
        status: payload.status,
        battle_id: payload.battle_id,
      }

    case 'game/shuffle_set':
      const shuffle = {
        ...state.shuffle,
        modules: payload.modules,
        round: payload.round,
      }

      return {
        ...state,
        shuffle,
        my_robot: { ...payload.robot },
      }

    case startFight.type + '_success':
      return {
        ...state,
        boss: { ...payload.boss },
        status: payload.status,
      }

    case activateModule.type:
      const my_robot_act = state.my_robot
      let activating_module_index

      for (const index in my_robot_act.modules) {
        const module = my_robot_act.modules[index]
        if (module.id === payload.id) {
          activating_module_index = index
        }
      }

      if (!activating_module_index) {
        return {
          ...state,
        }
      }

      my_robot_act.modules[activating_module_index].status = 'selected'

      return {
        ...state,
        my_robot: { ...my_robot_act },
      }

    case deactivateModule.type:
      const my_robot_deact = state.my_robot
      let deactivating_module_index

      for (const index in my_robot_deact.modules) {
        const module = my_robot_deact.modules[index]
        if (module.id === payload.id) {
          deactivating_module_index = index
        }
      }

      if (!deactivating_module_index) {
        return {
          ...state,
        }
      }

      my_robot_deact.modules[deactivating_module_index].status = 'active'

      return {
        ...state,
        my_robot: { ...my_robot_deact },
      }

    case fightStep.type + '_success':
      return {
        ...state,
        log: payload.log ? [...payload.log] : [],
        status: payload.status,
        winner: payload.winner,
        boss: payload.boss ? { ...payload.boss } : state.boss,
        my_robot: payload.robot ? { ...payload.robot } : state.my_robot,
      }

    default:
      return state
  }
}

export { reducer }
