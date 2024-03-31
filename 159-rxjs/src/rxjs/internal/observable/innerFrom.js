import { isArrayLike } from '../util/isArrayLike';
import { isPromise } from '../util/isPromise';
import { Observable } from '../Observable';

export function innerFrom(input) {
    if(input instanceof Observable) {
        return input
    }

    if(input != null) {
       if(isArrayLike(input)) {
           return fromArrayLike(input)
       }
       if(isPromise(input)) {
           return fromPromise(input)
       }
    }
}

export function fromArrayLike(array) {
    return new Observable(subscriber => {
        for(let i = 0; i < array.length; i++) {
            subscriber.next(array[i])
        }

        subscriber.complete()
    })
}

export function fromPromise(promise) {
    return new Observable(subscriber => {
        promise.then(value => {
            subscriber.next(value)
            subscriber.complete()
        })
    })
}
