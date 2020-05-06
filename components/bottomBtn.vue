<template>
	<view>
		<view class="bottom">{{txt}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			txt: String,
			default: ''
		}
	}
</script>

<style>
	.bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: #55AFFD;
		font-size: 30upx;
		text-align: center;
		color: #fff;
	}
</style>
