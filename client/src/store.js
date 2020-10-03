import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddelware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory();

const sagaMiddleWare = createSagaMiddelware();

const initialState = {};

const middlewares = [sagaMiddleWare, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer = process.env.NODE_ENV === "prod" ? compose : devtools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleWare.run(rootSaga);

export default store