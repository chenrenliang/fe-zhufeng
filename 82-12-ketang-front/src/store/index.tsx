import {createReduxHistory, routerMiddleware} from "./history";


export const store = applyMiddleware(routerMiddleware)(createStore)(combinedReducer)
export const history = createReduxHistory(store)