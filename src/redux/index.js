import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "../history";
import creatSagaMiddleware from "redux-saga";
// import { saga } from "../ducks/people";
import rootSaga from "./saga";

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose;

const sagaMiddleware = creatSagaMiddleware();
const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger
);

const store = createStore(reducer, composeEnhancers(enhancer));
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
