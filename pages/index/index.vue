<template>
	<view class="container">
		<view class="btn-area">
			<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
				<button type="default">跳转到新页面</button>
			</navigator>
			<br />
			<navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
				<button type="default">在当前页打开</button>
			</navigator>
			<br />
			<navigator url="/pages/index/login" open-type="redirect" hover-class="other-navigator-hover">
				<button type="default">跳转tab页面</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: "https://uniapp.dcloud.io/component/README?id=uniui",
			};
		},
		methods: {},
	};
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>