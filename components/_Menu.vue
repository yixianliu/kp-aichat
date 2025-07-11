<script>
import {getToken} from "../api/Token";
import {getUserInfo} from "../api/User";

export default {
    data() {
        return {
            activeIndex: "/index",
            userLogin: false,
            username: "",
            info: "",
        };
    },
    methods: {
        init() {
            const token = getToken();

            if (token) {
                this.userLogin = true;

                getUserInfo().then((res) => {
                    // res则为promise对象的返回的值，可以在then()方法里面做数据处理
                    this.info = res.data;
                    this.username = res.data.username;
                    console.log(this.info);
                });
            }
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<template>
    <div>
        <el-menu :default-active="activeIndex" router="true" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/index">首页</el-menu-item>
            <el-sub-menu index="2">
                <template #title>关于我</template>
                <el-menu-item index="2-1">关于项目</el-menu-item>
                <el-menu-item index="2-2">上手文档</el-menu-item>
                <el-menu-item index="2-3">个人简历</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/product-ai">产品AI分析</el-menu-item>
            <el-menu-item index="/product">产品咨询</el-menu-item>
            <el-menu-item index="/guest">游客模式</el-menu-item>

            <el-menu-item index="/login" v-if="userLogin === false">登录</el-menu-item>
            <el-menu-item index="/logout" v-else>退出（<span>{{ username }}</span>）</el-menu-item>
        </el-menu>
    </div>
</template>

<style scoped></style>