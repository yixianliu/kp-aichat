import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// 引入登录的login的接口
import {
    login
} from "@/api/login.js";
// 引入拿token、设token、删token的方法
import {
    getToken,
    setToken,
    removeToken
} from "@/utils/auth.js";

const store = new Vuex.Store({
    state: {
        token: getToken(),
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
    },
    actions: {
        // 登录
        Login({
            commit
        }, userInfo) {
            const rememberMe = userInfo.rememberMe;
            return new Promise((resolve, reject) => {
                login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid)
                    .then((res) => {
                        //登录成功的操作
                        //设置cookie中的token
                        setToken(res.data.token, rememberMe);
                        //触发vuex中的SET_TOKEN方法，设置vuex仓库中的token
                        commit("SET_TOKEN", res.data.token);
                        resolve(res);
                    })
                    .catch((error) => {
                        //登录失败的操作
                        reject(error);
                    });
            });
        },
    },
});

//记得将store暴露出去
export default store;