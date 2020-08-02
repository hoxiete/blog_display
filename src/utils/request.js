import axios from 'axios'
import store from '@/store'

export const imgBaseUrl = "http://resource.hoxiete.cn/"
// create an axios instance
const service = axios.create({
     baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: "http://localhost:8088/blogShow",
    //  baseURL: "http://www.hoxiete.cn/zhwtf/blogShow",
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // store.commit('SET_LOADING',false);

        // if the custom code is not 20000, it is judged as an error.
        if (res.status !== 200) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
