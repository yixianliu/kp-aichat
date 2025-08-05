<template>
	<view class="container"></view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {
			// 获取状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()["statusBarHeight"];
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1,
				});
			},
		},
	};
</script>

<style></style>