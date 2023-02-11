import axios from 'axios'

const http = axios.create({
  // 'http://127.0.0.1:5000';
// 上线服务器地址
// export const BASE_URL = 'http://115.159.153.85:5000';
// process.env.VUE_APP_BASE_URL===>项目全局查找VUE_APP_BASE_URL
// // 通过全局配置文件载入变量，并根据当前环境 载入变量的值
  baseURL: process.env.VUE_APP_BASE_URL, // baseURL的值 会被本地代理的真实服务器地址替换==>其值随意
  // baseURL: 'http://127.0.0.1:5000',
  timeout: 60000
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default http
