import { combineReducers } from 'redux';
import common from '@/stores/reducers/commonReducer';
import account from '@/stores/reducers/accountReducer';

const reducer = combineReducers({
  common,
  account
});

export default reducer;
