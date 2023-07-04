import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '@/stores/reducers';

const middlewares = [thunk];
// 开发环境开启redux日志
process.env.NODE_ENV === 'development' && middlewares.push(logger);

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;
