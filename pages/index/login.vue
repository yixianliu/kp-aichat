<template>
    <view>
        <view class="login">
            <uni-forms ref="baseForm" :modelValue="alignmentFormData" label-position="top">
                <uni-forms-item label="账户" required>
                    <uni-easyinput v-model="loginForm.username" placeholder="请输入姓名" />
                </uni-forms-item>
                <uni-forms-item label="密码" required>
                    <uni-easyinput v-model="loginForm.password" placeholder="请输入密码" />
                </uni-forms-item>
            </uni-forms>

            <view class="uni-btn-v">
                <button @click="login">登录</button>
                <button type="default" form-type="reset">Reset</button>
            </view>
        </view>
    </view>
</template>

<script>
    //注意哦，Cookie.set和Cookie.get的方法都要引入js-cookie才能用哦
    import Cookies from "js-cookie";
    //要引入encrypt才能使用rsa算法对密码进行加密
    import {
        encrypt
    } from "@/utils/rsaEncrypt.js";
    import Config from "@/settings/setting.js";

    export default {
        data() {
            return {
                loginForm: {
                    username: "",
                    password: "",
                    rememberMe: false,
                    code: "",
                    uuid: "",
                },
            };
        },
        created() {
            // 利用生命周期钩子在页面构建之前获取验证码
            this.getCodes();
            // 利用生命周期钩子在页面构建之前获取用户名密码等Cookie
            this.getCookie();
        },
        methods: {
            onSubmit(e) {
                console.log(this.baseFormData);
                e.preventDefault();
            },

            getCodes() {
                //调用获取验证码的接口
                getCode().then((res) => {
                    this.codeUrl = res.data.img;
                    this.loginForm.uuid = res.data.uuid;
                });
            },

            getCookie() {
                const username = Cookies.get("username");
                let password = Cookies.get("password");
                const rememberMe = Cookies.get("rememberMe");
                // 保存cookie里面的加密后的密码
                this.cookiePass = password === undefined ? "" : password;
                this.loginForm = {
                    username: username === undefined ? this.loginForm.username : username,
                    password: password === undefined ? this.loginForm.password : password,
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
                    code: "",
                };
            },

            login() {
                const user = {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    rememberMe: this.loginForm.rememberMe,
                    code: this.loginForm.code,
                    uuid: this.loginForm.uuid,
                };
                //如果从cookie里面拿到的password和用户输入的不一样，就加密
                if (user.password !== this.cookiePass) {
                    //注意：这里我们使用了rsa非对称加密，要记得引入啊
                    user.password = encrypt(user.password);
                }
                //检验填写是否规范
                if (this.loginForm.username.length == 0 || this.loginForm.password.length == 0 || this.loginForm.code.length == 0) {
                    //填写不规范
                    uni.showToast({
                        icon: "none",
                        title: "请填写完整",
                    });
                    return;
                } else {
                    //填写规范
                    if (user.rememberMe) {
                        Cookies.set("username", user.username, {
                            //这里用到了config，记得引入
                            expires: Config.passCookieExpires,
                        });
                        Cookies.set("password", user.password, {
                            //这里用到了config，记得引入
                            expires: Config.passCookieExpires,
                        });
                        Cookies.set("rememberMe", user.rememberMe, {
                            //这里用到了config，记得引入
                            expires: Config.passCookieExpires,
                        });
                    } else {
                        Cookies.remove("username");
                        Cookies.remove("password");
                        Cookies.remove("rememberMe");
                    }

                    // 这里使用了异步触发vuex中的Login方法，并且将user对象作为参数传入
                    this.$store
                        .dispatch("Login", user)
                        .then((res) => {
                            uni.navigateTo({
                                url: "/pages/companyExam/companyExam?deptId=" + res.data.user.user.dept.id,
                            });
                        })
                        .catch((error) => {
                            uni.showToast({
                                icon: "none",
                                title: "密码或验证码不正确",
                            });
                            this.getCodes();
                        });
                }
            },
        },
    };
</script>

<style>
    .login {
        padding: 15px;
        background-color: #fff;
    }

    .segmented-control {
        margin-bottom: 15px;
    }

    .button-group {
        margin-top: 15px;
        display: flex;
        justify-content: space-around;
    }

    .form-item {
        display: flex;
        align-items: center;
    }

    .button {
        display: flex;
        align-items: center;
        height: 35px;
        margin-left: 10px;
    }
</style>
-