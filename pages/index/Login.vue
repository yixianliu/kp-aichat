<template>

    <div v-if="true">

        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="100">
            <el-form-item label="帐号" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox size="large" v-model="loginForm.agree">
                    我已同意隐私条款和服务条款
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
    <div v-else>
        登录成功！
    </div>

</template>

<script>
import {reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';
import {useRouter} from 'vue-router';
import {login} from '@/api/User'
import {setToken} from '@/api/Token'

export default {

    setup() {

        const router = useRouter();

        const centerDialogVisible = ref(false)

        const loginFormRef = ref(null);

        const loginForm = reactive({
            username: '',
            password: '',
            agree: true,
        });

        const rules = reactive({
            username: [{
                required: true,
                message: '请输入用户名！',
                trigger: 'blur'
            }],
            password: [{
                required: true,
                message: '请输入密码！',
                trigger: 'blur'
            },
                {
                    min: 6,
                    max: 38,
                    message: '密码长度为6-38个字符',
                    trigger: 'blur'
                }],
            agree: [{
                validator: (rule, value, callback) => {
                    console.log(value)
                    // 自定义校验逻辑
                    // 勾选就通过 不勾选就不通过
                    if (value) {
                        callback()
                    } else {
                        callback(new Error('请勾选隐私条款和服务条款协议'))
                    }
                }
            }]
        });

        // 错误提示
        const errorMessage = reactive({
            username: "",
            password: "",
        });

        const submitForm = (formEl) => {

            if (!formEl)
                return;

            formEl.validate((valid) => {

                if (valid) {

                    const data = {
                        username: loginForm.username,
                        password: loginForm.password,
                    }

                    login(data).then(res => {

                        if (res.code === 1) {

                            // 提示成功信息
                            ElMessage.success(res.msg || '登录成功');

                            // 存入该账号的token
                            setToken(res.token)

                            console.log('登录成功');
                            router.push('/mount')

                        } else {
                            ElMessage.error(res.msg || '登录失败');
                        }

                    });

                } else {
                    ElMessage.error('登录失败');
                    console.log('登录失败!');
                    return false;
                }

            });
        };

        const resetForm = (formEl) => {
            if (!formEl) return;
            formEl.resetFields();
        };

        return {
            loginFormRef,
            loginForm,
            rules,
            submitForm,
            resetForm,
            centerDialogVisible,
        };
    }
};
</script>

<style scoped></style>