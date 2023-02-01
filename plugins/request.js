/* 
    基于axios封装的请求模块
*/
import axios from "axios";

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

//通过插件机制，获取上下本对象（query， params，res，req，app，store。。。）
export default ( {store} ) => {
    //请求拦截器
    //任何请求都会经过请求拦截器
    //可以在这里，做统一配置
    request.interceptors.request.use(function (config) {

        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${ user.token}`
        }
        
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}


