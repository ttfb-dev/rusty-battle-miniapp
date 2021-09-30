import { setUserId, getBossName } from './action';
import { reducer } from './reducer';

const general = {
  action: { setUserId, getBossName },
  reducer,
};

export { general };
