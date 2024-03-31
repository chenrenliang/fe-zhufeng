import { isObservable } from './externals'
import { createObservable } from './internals'
import { RawProxy } from './environment'

export const baseHandlers = {
    get(target, key) {
        const result = target[key]
        const observableResult = RawProxy.get(result)
        if(observableResult) {
            return observableResult
        }
        if(!isObservable(result)) {
            return createObservable(target, key, value)
        }

        return result
    },
    set(target, key, value) {
        const newValue = createObservable(target, key, value)
        target[key] = newValue
        return true
    }
}
