// import { createStore } from 'redux';
import {configureStore, createReducer} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const ADD = 'ADD'
const MINUS = 'MINUS'

function add() {
    return { type: ADD }
}

function minus() {
    return { type: MINUS }
}
// function counter(state = { number: 0 }, action) {
//     switch (action.type) {
//         case ADD:
//             return {number:state.number+1}
//         case MINUS:
//             return {number:state.number-1}
//         default:
//             return state
//     }
// }

const counter = createReducer({number: 0}, {
    [add]: state => ({number: state.number+1}),
    [minus]:state=>({number: state.number-1})
})


// var store = createStore(counter)
const store = configureStore({
    reducer: counter,
    middleware: [thunk, logger]
})
var valueEl = document.getElementById('value')

function render() {
    valueEl.innerHTML = store.getState().number;
}

render()

store.subscribe(render)

document.getElementById('add').addEventListener('click', function () {
    store.dispatch(add())
})

document.getElementById('minus').addEventListener('click', function () {
    store.dispatch(minus())
})

document.getElementById('async-add').addEventListener('click', function () {
    store.dispatch((dispatch) => {
        setTimeout(() => {
            dispatch(add())
        }, 1000)
    })
})