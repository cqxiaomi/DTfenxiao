<template>
	<view>
		<view class="box">
			<view class="title">
				<image src="../../static/mall/title02.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">优惠券兑换</text>
				</view>
			</view>
			<view class="goods-box" v-if="cash_coupon_list.length!=0">
				<view class="goods-item" v-for="(item,i) in cash_coupon_list" :key="i" @tap="toCouponDetail(i)">
					<view class="coupon-box">
						<image src="../../static/mall/bg01.png" mode="widthFix"></image>
						<text class="tip">抢</text>
						<view class="coupon-txt">
							<view style="font-weight: 600;font-size: 40upx;margin-left: 5upx;">¥{{item.money}}</view>
							<view style="margin-left: 15upx;font-size: 24upx;">满{{item.condition}}可用</view>
						</view>
					</view>
					<view style="line-height: 60upx;color: red;font-size: 34upx;font-weight: 600;">¥ {{item.price}}元</view>
					<view class="coupon-bottom">
						<view style="position: relative;padding-left: 40upx;color: #E8B100;font-size: 24upx;">
							<image src="../../static/mall/tip01.png" mode="widthFix"></image>门店专享
						</view>
						<view style="background-color: red;padding: 0 15upx;border-radius: 20upx;color: #fff;font-size: 24upx;">立即兑换</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cash_coupon_list: []
			}
		},
		onLoad() {
			this.getCouponList()
		},
		methods: {
			toCouponDetail(index) {
				uni.setStorageSync('couponDetail', this.cash_coupon_list[index])
				uni.navigateTo({
					url: "../couponDetail/couponDetail?type=1"
				})
			},
			getCouponList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/coupon/indexCashCouponList',
					data: {
						label: 1
					},
					header: this.header,
					method: "POST",
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.cash_coupon_list = res.data.data.cash_coupon_list
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.title {
		padding: 0 20upx 0 70upx;
		line-height: 80upx;
		background-color: #fff;
		position: relative;
	}

	.title image {
		width: 40upx;
		position: absolute;
		top: 50%;
		left: 20upx;
		transform: translateY(-50%);
	}

	.price-txt {
		position: absolute;
		width: 100%;
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
		font-weight: 600;
		color: #fff;
	}

	.goods-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 30upx;
	}
	
	.goods-item {
		width: 48%;
		margin-top: 20upx;
		background-color: #fff;
		padding: 20upx 30upx;
	}

	.coupon-box {
		position: relative;
	}

	.coupon-box .tip {
		position: absolute;
		left: 15upx;
		top: 8upx;
		font-weight: 800;
		color: red;
		font-size: 26upx;
		height: auto;
	}

	.coupon-bottom {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.coupon-bottom image {
		width: 30upx;
		height: auto;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.coupon-txt {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		text-align: center;
		color: #fff;
	}
</style>
