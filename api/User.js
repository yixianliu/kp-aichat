import {post} from '@/api/Request'

/**
 * 登录
 * @param data
 * @returns {*}
 */
export function login(data) {
    return post('/v1/token/login', data);
}

/**
 * 注册
 * @param data
 * @returns {*}
 */
export function register(data) {
    return post('/v1/token/register', data);
}

/**
 * 登出
 * @returns {*}
 */
export function logout() {
    return post('/v1/token/logout');
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo() {
    return post('/v1/user/info');
}