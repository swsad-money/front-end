/*
 * @Description: axios
 */

import axios from 'axios'
import config from './config.js'
import qs from 'qs'

import { Toast } from 'vant';

export default function $axios (options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: {},
            transformResponse: [function (data) {}]
        }
    )
    instance.interceptors.request.use(
        config => {
			// Serialize
			if (config.method.toLocaleLowerCase() === 'post' 
				|| config.method.toLocaleLowerCase() === 'put' 
				|| config.method.toLocaleLowerCase() === 'delete') {

				config.data = qs.stringify(config.data)
			}
          	return config
        },
        error => {
			// Close loadding
			console.log('request:', error) 
		
			//  if timeout
			if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				console.log('请求超时')
				// return service.request(originalRequest); // once time
			}

			//  redirect
			const errorInfo = error.response
			console.log(errorInfo)
			if (errorInfo) {
				// error =errorInfo.data
				const errorStatus = errorInfo.status; // 404 403 500 ... 
				router.push({
					path: `/error/${errorStatus}`
				})
			}
			return Promise.reject(error) // catch error
        }
    )
  
    instance.interceptors.response.use(
        response => {
			let data;
			if(response.data == undefined){
				data = response.request.responseText
			} else{
				data = response.data
			}
			// code from back-end

			data = JSON.parse(data);
			switch (data.code) {
				case 0:
					const message = data.msg || 'Error';
					Toast.fail({
						message,
						duration: 1000
					});
					return Promise.reject(message);
				default:
			}
			// wrong code
			// const err = new Error(data.description)

			// err.data = data
			// err.response = response

			// throw err
          	return data
        },
        err => {
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
					err.message = '请求错误'
					break
			
					case 401:
					err.message = '请先登录'
					break
			
					case 403:
					err.message = '拒绝访问'
					break
			
					case 404:
					err.message = `请求地址出错: ${err.response.config.url}`
					break
			
					case 408:
					err.message = '请求超时'
					break
			
					case 500:
					err.message = '内部错误'
					break
			
					case 501:
					err.message = '服务未实现'
					break
			
					case 502:
					err.message = '网关错误'
					break
			
					case 503:
					err.message = '服务不可用'
					break
			
					case 504:
					err.message = '网关超时'
					break
			
					case 505:
					err.message = 'HTTP版本不支持'
					break
			
					default:
				}
			}
			console.error(err)
			// Message.error(`ERROR: ${err}`);
			return Promise.reject(err) 
        }
    )
  
    // response
    instance(options)
        .then((res) => {
			resolve(res)
			return false
        })
        .catch((error) => {
            reject(error)
        })
    })
}