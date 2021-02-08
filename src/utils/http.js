import axios from 'axios'
import { showLoading, hideLoading} from './loading'
import { ElMessage as Message } from 'element-plus'

// 错误状态码
const errStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '您的账号因长时间未操作退出，请重新登录！'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return message
}

// 请求实例
const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? `/` : 'api',
    baseURL: 'api',
})

// 请求拦截
service.interceptors.request.use(
    config => {
        showLoading()
        return config
    },
    err => {
        hideLoading()
        err.data = {}
        err.data.msg = '请求异常'
        Message.error(err.data.msg)
        return Promise.reject(err)
    }
)

// 响应拦截
service.interceptors.response.use(
    res => {
        hideLoading()
        const status = res.status
        let msg = ''
        if (status < 200 || status >= 300) {
            msg = errStatus(status)
            if (typeof res.data === 'string') {
                res.data = { msg }
            } else {
                res.data.msg = msg
            }
            Message.error(msg)
        }
        return Promise.resolve(res.data)
    },
    err => {
        hideLoading()
        const status = err.response.status;
        err.data = {}
        if (status === 401) {
            err.data.msg = errStatus(status)
            Message.info(err.data.msg)
            // router.push('login')
        } else {
            err.data.msg = '服务器异常！'
            Message.error(err.data.msg)
        }
        return Promise.reject(err)
    }
)

export default service