<template>
	<div class="layout">
		<el-row>
			<el-col :span="2"></el-col>
			<el-col :span="20">
				<el-container>
					<el-header>
						<MenuView />
					</el-header>

					<el-main class="layout-main">
						<router-view></router-view>
					</el-main>

					<el-footer>
						<el-divider />
						<p>
							<el-text class="mx-1">版权所有 ©1997-2025</el-text>
							/
							<el-text class="mx-1">
								<router-link to="/mount">系统挂载</router-link>
							</el-text>
						</p>
					</el-footer>
				</el-container>
			</el-col>
			<el-col :span="2"></el-col>
		</el-row>
	</div>
</template>

<style scoped>
	.layout-main {
		min-height: 800px;
	}
</style>

<script setup lang="ts">
	import MenuView from "@/components/_Menu.vue";
</script>