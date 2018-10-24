import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../history";
import creatSagaMiddleware from "redux-saga";
import { saga } from "../ducks/people";

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose;

const sagaMiddleware = creatSagaMiddleware();
const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  thunk,
  logger
);

const store = createStore(reducer, composeEnhancers(enhancer));
window.store = store;

sagaMiddleware.run(saga);

export default store;
