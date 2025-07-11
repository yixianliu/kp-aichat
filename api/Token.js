//设置变量
const TokenName = 'user_token'; //token的缓存名称,名称存储键
const TokenExpireKey = 'user_token_expire'; // Token 过期时间存储键

/**
 * 设置Token
 * @param token
 */
export function setToken(token) {

    // 通过缓存去设置名为token的值为变量token
    localStorage.setItem(TokenName, token);

    // 过期时间设置
    const expireTimeInMinutes = 260; // 固定超时时间为 30 分钟

    // 获取当前时间+超时时间(需要转换为毫秒)
    var time = new Date().getTime() + expireTimeInMinutes * 60 * 1000;

    // 将超时时间数据存入缓存
    localStorage.setItem(TokenExpireKey, time);
}

/**
 * 获取Token
 * @returns {string}
 */
export function getToken() {

    //从缓存中获取当前的token
    var token = localStorage.getItem(TokenName);

    //判断token是否过期
    if ( token ) { //如果缓存中存在token，就执行判断逻辑
        var expire_time = localStorage.getItem(TokenExpireKey); //获取过期时间
        var new_time = new Date().getTime(); //获取当前时间

        if ( new_time > expire_time ) { //如果当时时间超过过期时间，表示已经过期
            delToken(); //执行删除此token的操作
        }
    }
    return localStorage.getItem(TokenName); // 返回现在的token信息
}

/**
 * 删除Token
 */
export function delToken() {
    localStorage.removeItem(TokenName); //删除token
    localStorage.removeItem(TokenExpireKey); //删除过期时间
}