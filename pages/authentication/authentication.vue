<template>
	<view>
		<view class="top">
			<view class="top-box bg-white">
				<image src="../../static/mall/icon10.png" mode="widthFix"></image>
				<view style="font-size: 40upx;font-weight: 800;padding: 10upx 0 5upx;color: red;">50up</view>
				<view style="line-height: 40upx;">溯源认证</view>
			</view>
		</view>
		<view style="margin-top: 100upx;">
			<view style="padding: 0 30upx;line-height: 60upx;">支付方式</view>
			<view class="zhifu">
				<view style="position: relative;width: 60upx;">
					<image src="../../static/mall/icon2.png" mode="widthFix"></image>
				</view>
				<view style="flex: 1;margin-left: 30upx;">up支付</view>
				<i class='iconfont iconjiegouxuanxuanzhong' style="color: red;font-size: 40upx;"></i>
			</view>
			<view class="btn" @tap="pay">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			pay(){
				this.showToast('功能暂未开放')
			}
		}
	}
</script>

<style>
	.top {
		background-color: #55AFFD;
		padding-top: 30upx;
	}

	.top-box {
		padding-top: 60upx;
		margin: 30upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		text-align: center;
	}

	.top-box image {
		width: 120upx;
	}

	.zhifu {
		padding: 0 30upx;
		border-top: 1upx solid #ddd;
		border-bottom: 1upx solid #ddd;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}

	.zhifu image {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		width: 100%;
	}
	.btn {
		width: 540upx;
		margin: 50upx auto;
		background-color: #55AFFD;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		box-shadow: 0 3upx 10upx 3upx #ddd;
	}
</style>
