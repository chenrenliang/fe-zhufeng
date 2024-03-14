/**
 * +const add = createAction('ADD')
 * const minus = createAction('MINUS', (amount) => ({ payload: amount }))
 * +console.log(minus.toString());
 * +console.log(minus.type);
 * store.dispatch(minus(2))
 * createAction("MINUS", (amount) => ({payload: amount}))(2)
 */


function createAction(type, prepareAction) {
    function actionCreator(...args) {
        if (prepareAction) {
            var prepared = prepareAction.apply(null, args);
            return {
                type: type,
                payload: prepared.payload,
                error: prepared.error
            };
        }
        return {
            type: type,
            payload: args[0]
        };
    }
    actionCreator.toString = function () {
        return "" + type;
    }
    actionCreator.type = type;
    return actionCreator;
}
export default createAction;