import { startGame } from './action';

const initialState = {
  battle_id: null,
  status: null,
  shuffle: {
    round: 0,
    modules: [],
  },
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
      }
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
      }
    },
    effects: [],
    modules: [],
  }
};

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
  'feet';
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
  const { type, ...payload } = action;

  switch (type) {
    case startGame.type + '_success':
      const { battle_id, status } = payload;

      return {
        ...state,
        status,
        battle_id,
      };

    case 'game/shuffle_set':
      const { modules, round, robot } = payload;

      const shuffle = {...state.shuffle, modules, round};

      const my_robot = {...robot};

      return {
        ...state,
        shuffle,
        my_robot,
      }
      
    default:
      return state;
  }
};

export { reducer };
