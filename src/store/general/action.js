import { defineAction } from '@logux/actions';

const setUserId = defineAction('general/setUserId');
const getBossName = defineAction('general/get_random_name');

export { setUserId, getBossName };
