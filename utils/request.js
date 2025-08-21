import axios from "axios";
import {
    getToken
} from "./auth.js";
// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        //用到了getToken的方法，需要引入
        let token = getToken();
        config.headers["Authorization"] = token;
        config.headers["Content-type"] = "application/json";
        return config;
    },
    (err) => {
        return err;
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        console.log("来到了response拦截success中");
        return response.data;
    },
    (err) => {
        console.log("来到了response拦截failure中");
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "参数错误（400）";
                    break;
                case 401:
                    err.message = "未授权访问（401）";
                    let pages = getCurrentPages(); //拿到页面的栈
                    console.log("401了，去登录界面", pages);
                    if (pages[pages.length - 1].$page.fullPath === "/pages/releaseNotice/index") {
                        uni.redirectTo({
                            url: "/pages/releaseNotice/fakeIndex",
                        });
                    } else {
                        uni.redirectTo({
                            //当前页面的地址编码给callback
                            url: "/pages/login/index?callback=" + encodeURIComponent(pages[pages.length - 1].$page.fullPath),
                        });
                    }
                    break;

                case 403:
                    err.message = "权限错误（403）";
                    break;
                case 404:
                    err.message = "访问资源错误（404）";
                    break;
                case 500:
                    err.message = "服务器错误（500）";
                    break;
            }
        } else if (err.response.status < 200 || err.response.status > 300) {
            err.message = "请求失败";
        }
        return Promise.reject(err);
    }
);