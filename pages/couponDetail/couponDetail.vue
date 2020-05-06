<template>
	<view>
		<view style="background-color: #fff;margin-bottom: 20upx;">
			<view class="coupon-pic">
				<image src="../../static/mall/bg01.png" v-if="type==1" mode="widthFix"></image>
				<image src="../../static/mall/bg02.png" v-if="type==2" mode="widthFix"></image>
				<text class="tip">抢</text>
				<view class="coupon-txt">
					<view class="">¥<text style="font-size: 80upx;font-weight: 600;padding-left: 10upx;">{{couponDetail.money}}</text></view>
					<view style="font-size: 24upx;" v-if="type==2">有效期：{{couponDetail.use_start_time}}至{{couponDetail.use_end_time}}</view>
				</view>
			</view>
			<view class="coupon-msg">
				<view style="font-size: 34upx;font-weight: 800;">{{couponDetail.name}}<text style="font-size: 28upx;font-weight: normal;" v-if="couponDetail.condition">（满{{couponDetail.condition}}可用）</text></view>
				<view style="color: red;">
					<text style="font-size: 40upx;font-weight: 800;padding-right: 10upx;" v-if="type==1">¥{{couponDetail.price}}</text>
				</view>
				<view style="color: red;">
					<text style="font-size: 40upx;font-weight: 800;padding-right: 10upx;" v-if="type==2">{{couponDetail.point}}UP</text>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="title" style="font-weight: 600;">商品详情</view>
			<view class="txt">
				<view>1.兑换成功后，在小程序“我的”页面点击【优品券】可查询已兑换的优品券；</view>
				<view>2.在店铺下单结算时，点击【选择优品券】，可使用已经兑换的优品券进行抵扣</view>
			</view>
			<view class="title">温馨提示</view>
			<view class="txt">
				<view>1.本券有使用有效期，逾期作废；</view>
				<view>2.本券可在全国多家门店通用；</view>
				<view>3.本券不兑换现金，不设找赎，不提供发票；</view>
			</view>
		</view>
		<bottom-btn :txt="'立即兑换'" v-if="couponDetail.price" @tap="exchange(1)"></bottom-btn>
		<bottom-btn :txt="'立即领取'" v-else @tap="exchange(2)"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponDetail: null,
				noClick:false,
				couponId:null,
				type:1
			}
		},
		onLoad(options) {
			this.type = options.type
			this.couponDetail = uni.getStorageSync('couponDetail')
		},
		methods: {
			exchange(type) {
				if(type==1){
					if (this.noClick) {
						this.showToast('请勿重复点击')
						return
					}
					this.noClick = true
					this.setheader()
					uni.request({
						url: this.websiteUrl + '/api/coupon/couponPay',
						data: {
							token: uni.getStorageSync('token'),
							id: this.couponDetail.id,
							type: 'coupon'
						},
						header: this.header,
						method: 'POST',
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
											title: "兑换成功",
											icon: 'success'
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
				}else if(type==2){
					this.setheader()
					uni.request({
						url: this.websiteUrl + '/api/coupon/getCoupon',
						data: {
							token: uni.getStorageSync('token'),
							id: this.couponDetail.id
						},
						header: this.header,
						success: (res) => {
							console.log(res.data)
							if (res.data.status == 0) {
								uni.navigateTo({
									url:"../exchangeSuccess/exchangeSuccess"
								})
								return
							}
							this.showToast(res.data.msg)
						}
					})
				}
			},
			//处理下单时间
			handleTime(time) {
				let date = new Date(time * 1000)
				let Y = date.getFullYear().toString()
				let M = (date.getMonth() + 1).toString().padStart(2, '0')
				let D = date.getDate().toString().padStart(2, '0')
				// let h = date.getHours().toString().padStart(2, '0')
				// let m = date.getMinutes().toString().padStart(2, '0')
				// let s = date.getSeconds().toString().padStart(2, '0')
				// let newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
				let newTime = Y + '.' + M + '.' + D
				return newTime
			}
		}
	}
</script>

<style>
	page {
		background-color: #f1f1f1;
	}

	.exchange {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: #F23027;
		font-size: 28upx;
		text-align: center;
		color: #fff;
	}

	.con {
		background-color: #fff;
		padding: 30upx;
		margin-bottom: 200upx;
	}

	.title {
		line-height: 60upx;
	}

	.txt {
		padding: 0 15upx 30upx;
	}

	.txt>view {
		line-height: 50upx;
	}

	.coupon-pic {
		position: relative;
		margin:40upx 100upx;
	}

	.coupon-pic image {
		width: 100%;
		height: auto;
	}
	.tip {
		position: absolute;
		left: 28upx;
		top: 20upx;
		font-weight: 800;
		color: red;
		font-size: 40upx;
		height: auto;
	}

	.coupon-txt {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		text-align: center;
		font-size: 36upx;
		color: #fff;
		text-align: center;
	}

	.coupon-msg {
		line-height: 60upx;
		margin: 0 30upx;
		padding: 30upx 0;
	}
</style>
