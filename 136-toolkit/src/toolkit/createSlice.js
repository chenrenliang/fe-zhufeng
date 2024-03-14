/**
 * +const counterSlice = createSlice({
 * +  name: 'counter',
 * +  initialState: {number:0},
 * +  reducers: {
 * +    add: (state)  =>  ({number:state.number+1}),//派发的时候动作类型是 counter/add
 * +    minus: (state,action) => ({number:state.number-action.payload})
 * +  }
 * +})
 */

import { createReducer, createAction } from './'
import {create} from "axios";
function getType(slice, actionKey) {
    return slice + "/" + actionKey;
}

function createSlice(options) {
    let { name, initialState = {}, reducers = {}} = options
    let actions = {}
    const prefixReducers = {}

    Object.keys(reducers).forEach((key) => {
        var type = getType(name, key);
        actions[key] = createAction(type);
        prefixReducers[type]=reducers[key];
    })

    let reducer = createReducer(initialState, prefixReducers)
    return {
        name,
        reducer,
        actions
    }
}


export default createSlice;