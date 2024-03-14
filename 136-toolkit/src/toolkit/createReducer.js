/**
 * +const counter = createReducer({number:0}, {
 * +  [add]: state => ({number:state.number+1}),
 * +  [minus]: state => ({number:state.number-1})
 * +})
 */

function createReducer(initialState, reducers={}) {
    return function (state = initialState, action) {
        let reducer = reducers[action.type];
        if (reducer) return reducer(state, action);
        return state;
    }
}
export default createReducer;