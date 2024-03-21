import React, { useMemo } from 'react';
//导航上下文
const NavigationContext = React.createContext({});
//路径上下文
const LocationContext = React.createContext({});
//路由上下文
const RouteContext = React.createContext({});

export {
    NavigationContext,
    LocationContext,
    RouteContext
};


//HashRouter
//BrowserRouter
// <Router children={children} location={state.location} navagitor={history} navigationType={state.location} />


export function Router({ children, location, navigator }) {
    let navigationContext = useMemo(() => ({
        navigator
    }), [navigator])

    return (
        <NavigationContext.Provider value={navigationContext}>
            <LocationContext.Provider
                children={children}
                value={{location}}
            />
        </NavigationContext.Provider>
    )
}


export function useLocation() {
    return React.useContext(LocationContext).location;
}


function compilePath(path) {
    let source = '^' + path 
    source += '$'

    const matcher = new RegExp(source)
    return matcher
}

export function matchPath(path, pathname) {
    const matcher = compilePath(path)
    const match = pathname.match(matcher)

    if(!match) return null 
    return match
}

export function Route(props) {

}

export function useRoutes(routes) {
    let location = useLocation() 
    let  pathname = location.pathname || '/'
    
    for(let i = 0; i < routes.length; i++) {
        const { path, element } = routes[i]
        const match = matchPath(path, pathname)
        if(match) return element
    }

    return null

}

export function Routes({ children }) {
    return useRoutes(createRoutesFromChildren(children))
}

export function createRoutesFromChildren(children) {
    let routes = []

    React.Children.forEach(children, element => {
        const route = {
            path: element.props.path,
            element: element.props.element
        }
        routes.push(route)
    })

    return routes
}






