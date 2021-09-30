import { startGame } from './action';

const initialState = {
  battle_id: null,
  status: null,
  shuffle: {
    modules: [
      {
        id: 'garbage',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: '',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'head',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'head',
      },
    ],
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
    effects: [
      {
        id: '',
        title: '',
        description: '',
        image: '',
      },
    ],
    modules: [
      {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'head',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'left_hand',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'right_hand',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'core',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'legs',
      }
    ],
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
    effects: [
      {
        id: '',
        title: '',
        description: '',
        image: '',
      },
    ],
    modules: [
      {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'head',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'left_hand',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'right_hand',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'core',
      }, {
        id: '',
        title: '',
        description: '',
        energy: 0,
        status: '',
        image: '',
        place: 'legs',
      }
    ],
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

    default:
      return state;
  }
};

export { reducer };
