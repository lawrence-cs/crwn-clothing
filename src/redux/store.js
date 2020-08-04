import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //use this when debugging our redux code
import { persistStore } from 'redux-persist'; //to store localdate

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };