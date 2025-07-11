<template>

    <el-button type="primary" :disabled="isButtonDisabled" @click="submitForm">开始挂载</el-button>

</template>

<script>
import {ElMessage} from 'element-plus';
import {get} from '@/api/Request'
import {getToken} from "@/api/Token";
import router from "@/router";

export default {
    data() {
        return {
            // 挂载状态
            isButtonDisabled: false,
        }
    },
    methods: {
        submitForm() {

            const url = "/v1/token/mount";

            this.isButtonDisabled = true;

            const token = getToken();

            if (!token) {
                // this.isButtonDisabled = false;
                // ElMessage.error('请登录后操作！');
                // return false;
            }

            get(url).then(res => {

                console.log(res);

                if (res.data.code === 0) {

                    // 提示成功信息
                    ElMessage.success(res.msg || '挂载成功');

                    router.push('/user')
                } else {

                    this.isButtonDisabled = false;

                    ElMessage.error(res.msg || '挂载失败');
                }

            });
        },
    }

};
</script>

<style scoped>

</style>