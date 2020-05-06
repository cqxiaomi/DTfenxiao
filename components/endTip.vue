<template>
	<view>
		<view class="END">
			<text>END</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.END {
		text-align: center;
		margin-bottom: 40upx;
	}

	.END text {
		position: relative;
		letter-spacing: 2upx;
		font-size: 18upx;
		color: #aaa;
		padding: 0 20upx;
	}

	.END text::after,
	.END text::before {
		content: '';
		position: absolute;
		width: 30upx;
		height: 2upx;
		margin-top: -1upx;
		top: 50%;
		background-color: #aaa;
	}

	.END text::after {
		right: -30upx;
	}

	.END text::before {
		left: -30upx;
	}
</style>
