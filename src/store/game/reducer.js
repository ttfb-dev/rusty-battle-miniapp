import {
  startGame,
  startFight,
  activateModule,
  deactivateModule,
  fightStep,
  whereIAm,
  forceFinish,
  loadGame,
  initDone,
} from './action'

const initialState = {
  battle_id: null,
  status: null,
  shuffle: {
    round: 0,
    modules: [],
  },
  log: [],
  my_robot: {},
  boss: {},
  loading: true,
  points: 0,
}

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
      return {
        ...state,
        shuffle: {
          ...state.shuffle,
          modules: payload.modules,
          round: payload.round,
        },
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
        points: payload.points,
      }
    
    case whereIAm.type + '_success': 
      return {
        ...state,
        status: payload.status,
        battle_id: payload.battle_id
      }

    case forceFinish.type + '_success': 
      return {
        ...state,
        status: payload.status,
        battle_id: payload.battle_id
      }

    case loadGame.type + '_success':
      return {
        ...state,
        my_robot: { ...payload.robot },
        boss: { ...payload.boss },
        shuffle: {
          ...state.shuffle,
          modules: payload.modules,
          round: payload.arming_round_number,
        },
      }

    case initDone.type: {
      return {
        ...state,
        loading: false,
      }
    }

    default:
      return state
  }
}

export { reducer }
