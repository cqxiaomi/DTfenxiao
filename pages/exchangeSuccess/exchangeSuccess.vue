<template>
	<view>
		<view style="text-align: center;margin-top: 60upx;">
			<text style="font-size: 80upx;color: #06BA03;" class="lg text-gray cuIcon-roundcheckfill"></text>
			<view style="font-size: 40upx;color: #06BA03;line-height: 100upx;font-weight: 600;">{{point?'兑换成功':'领取成功'}}</view>
			<view v-if="point"><text style="font-size: 100upx;padding-right: 10upx;">{{point}}</text>上优品</view>
		</view>
		<view v-if="point" style="display: flex;justify-content: space-between;border-bottom: 2upx solid #ddd;line-height: 80upx;padding: 0 30upx;padding-top: 60upx;">
			<view>支付方式</view>
			<view>上优品兑换</view>
		</view>
		<view class="btn" @tap="toMyCoupon">查看我的优品券</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				point: null
			}
		},
		onLoad(options) {
			this.point = options.point
		},
		methods: {
			toMyCoupon() {
				uni.redirectTo({
					url: "../discountTickets/discountTickets"
				})
			}
		}
	}
</script>

<style>
	.btn {
		margin: 80upx auto;
		width: 80%;
		line-height: 80upx;
		border-radius: 40upx;
		text-align: center;
		border: 2upx solid #ccc;
		color: #888;
	}

	.btn:hover {
		background-color: #f1f1f1;
	}
</style>
