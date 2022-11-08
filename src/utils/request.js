import axios from 'axios'

// 调用axios.create()函数，创建一个axios 的实例对象，用request来接收
const request = axios.create({
// 指定请求的根路径
  baseURL: 'https://www.escook.cn'
})

export default request
