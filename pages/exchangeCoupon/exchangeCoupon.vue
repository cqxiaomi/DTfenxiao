<template>
	<view>
		<view class="box">
			<view class="title">
				<image src="../../static/mall/title02.png" mode="widthFix"></image>
				<view class="title-con">
					<text style="font-size: 32upx;font-weight: 800;">优惠券兑换</text>
				</view>
			</view>
			<view class="goods-box" v-if="otherCoupons.length!=0">
				<view class="goods-item" v-for="(item,i) in otherCoupons" :key="i" @tap="toCouponDetail(i,2)">
					<view class="coupon-box">
						<image src="../../static/mall/bg02.png" mode="widthFix"></image>
						<text class="tip">抢</text>
						<view class="coupon-txt">
							<view class="">
								¥<text style="font-weight: 600;font-size: 40upx;margin-left: 5upx;">{{item.money}}</text>
								<!-- <text style="margin-left: 15upx;font-size: 24upx;">赠送礼包</text> -->
							</view>
							<!-- <view style="font-size: 20upx;" v-if="item.use_start_time">有效期：{{item.use_start_time}}至{{item.use_end_time}}</view> -->
						</view>
					</view>
					<view class="">{{item.name}}</view>
					<view class="coupon-bottom">
						<view class=""></view>
						<view style="background-color: #f1f1f1;padding: 0 15upx;border-radius: 20upx;color: #E8B100;font-size: 24upx;">{{item.use_type==1?"门店专享":item.use_type==2?"APP专享":"通用"}}</view>
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
				otherCoupons: []
			}
		},
		onLoad() {
			this.getCouponList()
		},
		methods: {
			toCouponDetail(index) {
				uni.setStorageSync('couponDetail', this.otherCoupons[index])
				uni.navigateTo({
					url: "../couponDetail/couponDetail?type=2"
				})
			},
			//获取优惠券列表
			getCouponList() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/coupon/indexCouponList',
					data: {
						token: uni.getStorageSync('token'),
						label:1
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.coupons = res.data.data.coupon_pay
							this.coupon_month = res.data.data.coupon_month
							this.coupon_day = res.data.data.coupon_day
							this.otherCoupons = this.coupon_month.concat(this.coupon_day)
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
