import React, { useLayoutEffect, useRef, useState } from 'react'
import { Router } from '../react-router';
import { createHashHistory, createBrowserHistory } from "history";
export * from '../react-router';


export function HashRouter({ children }) {
    let historyRef = useRef()
    if(historyRef.current == null) {
        historyRef.current = createHashHistory()
    }

    let history = historyRef.current
    let [state, setState] = useState({
        action: history.action,
        location: history.location
    })

    useLayoutEffect(() => {
        history.listen(setState)
    }, [history])

    return (
        <Router
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    )
}



export function BrowserRouter({ children }) {
    let historyRef = useRef()
    if(historyRef.current == null) {
        historyRef.current = createBrowserHistory()
    }

    let history = historyRef.current
    let [state, setState] = useState({
        action: history.action,
        location: history.location
    })

    useLayoutEffect(() => {
        history.listen(setState)
    }, [history])

    return (
        <Router
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    )
}