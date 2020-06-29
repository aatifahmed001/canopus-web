
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';

const middlewares = applyMiddleware(reduxPromise, logger);

export default createStore(combineReducers(reducers), middlewares);