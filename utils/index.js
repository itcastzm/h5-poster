import axios from 'axios'
const API = axios.create({
  // ...
  baseURL: 'http://git.itcast.cn',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
API.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('请求开始', JSON.stringify(config));
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
API.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.log('请求失败！', JSON.stringify(error))
  return error;
  // console.log('请求失败！')
  // return Promise.reject(error);
});


const Ajax = axios.create({
  // ...
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
Ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('请求开始', JSON.stringify(config));
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  console.log('请求失败！', JSON.stringify(error))
  // console.log('请求失败！')
  // return Promise.reject(error);
});




export {
  API,
  Ajax
};