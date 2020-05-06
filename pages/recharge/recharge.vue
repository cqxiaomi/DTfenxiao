<template>
	<view>
		<view class="top">
			<image src="../../static/mall/icon_03.png" mode="widthFix"></image>
			<view>当前UP：<text style="font-size: 36upx;font-weight: 800;">{{userPoint}}</text></view>
		</view>
		<view style="background-color: #F5F5F5;padding: 20upx 0;">
			<view class="recharge-money bg-white">
				<view class="money-box">
					<image src="../../static/mall/icon_03.png" mode="widthFix"></image>
					<view style="font-size: 36upx;">{{recharge.deposit_price}}元</view>
					<view>{{recharge.deposit_name}}</view>
					<i class='iconfont icongouxuan' id="check"></i>
				</view>
			</view>
		</view>

		<view style="padding: 30upx 0 120upx;">
			<view style="padding: 0 30upx;line-height: 60upx;">温馨提示</view>
			<view style="padding: 0 30upx 80upx;">
				<view style="line-height: 40upx;">1、兑换比例：1元 = 1UP</view>
				<view style="line-height: 40upx;">2、购买后若长时间无变化，请联系客服</view>
			</view>
			<view style="padding: 0 30upx;line-height: 60upx;">支付方式</view>
			<view class="zhifu">
				<i class='iconfont iconweixinzhifu' style="color: #6BCC03;font-size: 40upx;"></i>
				<view style="flex: 1;margin-left: 30upx;">微信支付</view>
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
				recharge: null,
				userPoint: null,
				upMoney: null,
				noClick:false
			}
		},
		onLoad() {
			this.recharge = uni.getStorageSync('recharge')
			this.userPoint = uni.getStorageSync('userPoint')
		},
		methods: {
			pay() {
				if(this.noClick){
					this.showToast('请勿重复点击')
					return
				}
				this.noClick = true
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/coupon/couponPay',
					data: {
						token: uni.getStorageSync('token'),
						id: this.recharge.id,
						type: 'deposit' 
					},
					header: this.header,
					method:'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: (res) => {
									this.noClick = false
									console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title:"兑换成功",
										icon:'success'
									})
								},
								fail: (err) => {
									this.noClick = false
									console.log('fail:' + JSON.stringify(err));
								}
							});
							return
						}
						this.showToast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.top image {
		width: 120upx;
		margin-bottom: 10upx;
		height: auto;
	}

	.top {
		background-color: #55AFFD;
		color: #fff;
		padding: 30upx 0;
		text-align: center;
	}

	.recharge-money {
		padding: 30upx;
		line-height: 40upx;
		color: red;
		position: relative;
	}

	.recharge-money image {
		width: 120upx;
		position: absolute;
		left: 20upx;
		top: 50%;
		transform: translateY(-50%);
		height: auto;
	}

	.zhifu {
		padding: 0 30upx;
		border-top: 1upx solid #ddd;
		border-bottom: 1upx solid #ddd;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
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

	#check {
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 40upx;
		color: red;
	}

	.money-box {
		border: 1upx solid red;
		border-radius: 20upx;
		position: relative;
		padding: 20upx;
		padding-left: 180upx;
		overflow: hidden;
	}
</style>
