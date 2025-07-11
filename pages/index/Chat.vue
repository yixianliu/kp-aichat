<script>
export default {
    name: "Chat"
}
</script>

<template>
    <el-card>
        <div class="chat-box" ref="chatBox">
            <div v-for="(msg, index) in messages" :key="index" class="message">
                <div v-if="msg.type === 'user'" class="user-message">
                    <img :src="avatar" alt="User" class="avatar"/>
                    <div class="message-content user-message-content">{{ msg.content }}</div>
                </div>
                <div v-if="msg.type === 'bot'" class="bot-message">
                    <img :src="avatar_bot" alt="Bot" class="avatar"/>
                    <div class="message-content bot-message-content">{{ msg.content }}</div>
                </div>
            </div>
        </div>
        <div class="input-area">
            <el-input
                    v-model="input"
                    placeholder="请输入您的问题..."
                    @keyup.enter.native="sendMessage"
                    class="input-field"
                    :style="{ maxWidth: 'calc(100% - 100px)' }"
            ></el-input>
            <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
    </el-card>
</template>

<style scoped>

</style>