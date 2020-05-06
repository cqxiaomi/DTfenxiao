<template>
	<view>
		<image src="../../static/mine/bg.png" mode="widthFix" style="width: 100%;"></image>
		<button type="primary" @tap="toLive">进入直播间</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		onLoad() {
			
		},
		methods: {
			toLive(){
				console.log("进入直播间6")
				uni.navigateTo({
					url:"plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=6"
					// url:"./trainingDetail"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f5f5f5;
	}
	.title {
		display: flex;
		justify-content: space-around;
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #fff;
		z-index: 100;
		font-size: 32upx;
		font-weight: 600;
		line-height: 80upx;
	}

	.title>view {
		position: relative;
		padding: 0 10upx;
	}

	.under {
		color: red;
		font-weight: 600;
		position: relative;
	}

	.under::after {
		content: "";
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 6upx;
		border-radius: 3upx;
		background-color: #F7756A;
	}

	.swiper {
		position: fixed;
		top: 100upx;
		bottom: 0;
		width: 100%;
		height: auto;
	}

	.article-box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-top: 20upx;
	}

	.article-pic {
		border-radius: 20upx;
		overflow: hidden;
		position: relative;
	}

	.article-pic>view {
		position: absolute;
		width: 100%;
		top: 50%;
		text-align: center;
		font-weight: 600;
		font-size: 40upx;
		color: #fff;
		transform: translateY(-50%);
		padding: 10upx;
	}

	.article-msg {
		display: flex;
		justify-content: space-between;
		font-size: 24upx;
		color: #333;
		margin: 10upx 0 40upx;
		line-height: 40upx;
	}

	.item {
		border-radius: 20upx;
		box-shadow: 0 3upx 10upx 0 #ddd;
		margin: 0 30upx 30upx;
		width: 690upx;
		line-height: 60upx;
		padding: 20upx;
		font-size: 36upx;
		font-weight: 600;
		background-color: #fff;
	}

	.null {
		position: fixed;
		top: 200upx;
		width: 100%;
		text-align: center;
	}

	.null image {
		width: 250upx;
		display: inline-block;
	}
</style>
