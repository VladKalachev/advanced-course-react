import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../history";

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose;

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);
const store = createStore(reducer, composeEnhancers(enhancer));
window.store = store;

export default store;
