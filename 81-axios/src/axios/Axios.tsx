import { AxiosRequestConfig, AxiosResponse } from './types';
import qs from 'qs';
import parse from 'parse-headers';
import AxiosInterceptorManger, { Interceptor } from './AxiosInterceptorManger'

interface Interceptors {
    request: AxiosInterceptorManger<AxiosRequestConfig>;
    response: AxiosInterceptorManger<AxiosResponse>;
}

let defaults: AxiosRequestConfig = {
    method: "get",
    timeout: 0,
    headers: {
        common: {
            accept: "application/json"
        }
    },
    transformRequest: function(data: Record<string, any>, headers: Record<string, any>) {
        headers['content-type'] = 'application/x-www-form-urlencoded'
        return qs.stringify(data)
    },
    transformResponse(data: any) {
        if(typeof data === 'string') data = JSON.parse(data)
        return data
    }
}


let getStyleMethods = ['get', 'head', 'delete', 'options']
getStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {}
})

let postStyleMethods = ['put', 'post', 'patch']
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {}
})

let allMethods = [...getStyleMethods, ...postStyleMethods]


class Axios {
    public defaults: AxiosRequestConfig = defaults

    public interceptors: Interceptors = {
        request: new AxiosInterceptorManger<AxiosRequestConfig>(),
        response: new AxiosInterceptorManger<AxiosResponse>()
    }


    request<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>>{
        return this.dispatchRequest(config)
    }

    dispatchRequest(config: AxiosRequestConfig): Promise<any> {

    }
}

export default Axios