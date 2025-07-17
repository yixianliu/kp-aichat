// 引入axios方法
import axios from "axios";
import {
	getToken,
	delToken
} from "@/api/Token";
import {
	ElMessage
} from "element-plus";

// 创建axios实例
const request = axios.create({
	baseURL: "http://127.0.0.1:8000/api",
	timeout: 10000, // 10秒超时响应
});

// 添加请求拦截器
request.interceptors.request.use(
	function(config) {
		// console.log(config)
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
request.interceptors.response.use(
	function(response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response.data;
	},
	function(error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		if (error.response && error.response.status === 401) {
			console.log(error);
			console.log("登录信息已过期，请重新登录！");

			if (error.response.data.msg !== null) {
				ElMessage.error(error.response.data.msg);
			} else {
				ElMessage.error("登录信息已过期，请重新登录！");
			}
			// 清除token
			delToken();
		} else if (error.response && error.response.status === 403) {
			ElMessage.error("权限不足，请联系管理员！");
		} else if (error.response && error.response.status === 404) {
			// 正常404页面不用处理，已经有404页面了，接口问题在这里处理
			ElMessage.error("接口不存在！");
		} else {
			ElMessage.error("请求失败！");
		}

		return Promise.reject(error);
	}
);

/**
 * 封装GET请求
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const get = (url, params = {}) => {
	return request.get(url, {
		params,
	});
};

/**
 * 封装POST请求
 * @param url
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const post = (url, data = {}) => {
	return request.post(url, data);
};

/**
 * 导出request实例
 */
export default request;