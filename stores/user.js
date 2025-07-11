import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('userinfo', () => {

    // 声明用户信息
    const userinfo = reactive({});// 对象

    // 获取用户名等。由于用户名是通过用户信息获取的，所以需要一个计算属性
    const username = computed(() => userinfo.name);

    // 设值用户信息
    const setUserinfo = ( info ) => {
        //对象使用assign,如果userInfo中有相同的key,则info覆盖userInfo的key信息,把之前有的信息进行更换)
        Object.assign(userinfo, info)
    }

    return {userinfo, username, setUserinfo}
})