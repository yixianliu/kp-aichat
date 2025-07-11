export const routes = [
    // 跳转页面
    {
        path: '/',
        redirect: to => {

            if (getToken()) {
                // return {name:'user'}
            }

            return { name: 'index' }
        }
    }, {

        path: '/index',
        name: 'index',
        component: () => import('./components/Index.vue'),
        meta: {
            title: '首页'
        }
    }, {
        path: '/logout',
        name: 'logout',
        component: () => import('./components/Logout.vue'),
        meta: {
            title: '一键登录'
        }
    }, {
        path: '/guest',
        name: 'guest',
        component: () => import('./components/Guest.vue'),
        meta: {
            title: '数据挂载'
        }
    }, {
        path: '/about',
        name: 'about',
        component: () => import('./components/About.vue'),
        meta: {
            title: '关于我'
        }
    }, {
        // 404
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('./components/NotFoundView.vue'),
        meta: {
            title: '页面未找到'
        }
    }
];