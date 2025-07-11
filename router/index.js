import {createMemoryHistory, createRouter} from 'vue-router';
import {getToken, delToken} from '@/api/Token';
import {userStore} from "@/stores/user";

export const routes = [
    // 跳转首页
    {
        path: '/',
        redirect: to => {

            if (getToken()) {
                // return {name:'user'}
            }

            return {name: 'index'}
        }
    }, {

        path: '/index',
        name: 'index',
        component: () => import('@/components/Index.vue'),
        meta: {
            title: '首页'
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录'
        }
    }, {
        path: '/guest',
        name: 'guest',
        component: () => import('@/views/Guest.vue'),
        meta: {
            title: '游客咨询'
        }
    }, {
        path: '/about',
        name: 'about',
        component: () => import('@/components/About.vue'),
        meta: {
            title: '关于我'
        }
    },
    {
        path: '/mount',
        name: 'mount',
        component: () => import('@/components/Mount.vue'),
        meta: {
            title: '系统挂载'
        }
    }, {
        // 404
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/components/NotFoundView.vue'),
        meta: {
            title: '页面未找到'
        }
    }
];

const router = createRouter({
    history: createMemoryHistory(import.meta.env.BASE_URL),
    routes,
});

// 设置一个不需要进行登录的页面数组
const NoLogin = ['login', 'not-found', 'about', 'index', 'mount'];

// 全局前置守卫
router.beforeEach((to, from, next) => {

    const token = getToken();

    //如果token不存在
    if (!token) {
        //在NoLogin数组中，表示不需要登录，就直接放行
        if (NoLogin.includes(to.name)) {
            next();
        }
        //如果不在NoLogin数组中，就表示需要登录，没有token就跳转到登录页面
        else {
            next();
        }
    }
    //token存在
    else {
        //如果在登录页面，就跳转到首页
        if (to.name === 'login') {
            next({name: 'index'});
        } else {

            //读取用户信息
            const user_store = userStore();

            // console.log(user_store);

            if (user_store.username) {
                next();
            } else {

                //请求之后，如果请求成功，就设置token，设置用户信息，放行，如果请求失败，就删除token，跳转到登录页面
                if (token) {

                    //将用户信息设置到store中
                    // user_store.setUserinfo(res.data);

                    next();

                } else {

                    //删除token
                    delToken();

                    //跳转到登录页面
                    next({name: 'login'})
                }
            }
        }
    }
});

export default router;