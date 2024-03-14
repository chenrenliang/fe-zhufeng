import { combineReducers,applyMiddleware,createStore,compose} from 'redux';
function isPlainObject(value) {
    if (typeof value !== "object" || value === null)
        return false;
    return Object.getPrototypeOf(value) === Object.prototype;
}
function configureStore(options = {}) {
    let { reducer, middleware = [thunk], preloadedState } = options;
    let rootReducer;
    if (typeof reducer === "function") {
        rootReducer = reducer;
    } else if (isPlainObject(reducer)) {
        rootReducer = combineReducers(reducer);
    }
    //rootReducer要么是传的reducer,要么是组合后的reducer对象
    const enhancer = applyMiddleware(...middleware)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, preloadedState, composeEnhancers(enhancer));
}
export default configureStore;


//compose
function add1(str){
    return str+1;
}
function add2(str){
    return str+2;
}
function compose(fn1,fn2){
    return function(str){
        return fn1(fn2(str))
    }
}
let fn = compose(add1, add2);
let result = fn('zhufeng');
console.log(result);//zhufeng21


// configureStore =>借用createStore
/**
 * const store = configureStore({
 *     reducer: counter,
 *     middleware: [thunk, logger]
 * }
 *
 * or = configureStore({
 *     reducer: {
 *         counter,
 *         home
 *     },
 *     middleware: [thunk, logger]
 * })
 */