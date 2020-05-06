<template>
	<view>
		<view class="money">
			<view class="red">¥<text style="font-size: 48upx;color: red;font-weight: 600;margin-left: 10upx;">{{order_price}}</text></view>
			<view class="time" style="font-size: 22upx;margin-top: 10upx;">
				<text style="background-color: #fff;margin-right: 20upx;">支付剩余时间</text>
				<text>00</text>:
				<text>{{timeArr[0]}}</text>:
				<text>{{timeArr[1]}}</text>
			</view>
		</view>
		<view class="pay-box">
			<view class="title">支付方式</view>
			<view class="payment" @tap="selectPayment">
				<i class='iconfont iconweixinzhifu' style="color: #6BCC03;font-size: 36upx;"></i>
				<text class="txt">微信支付</text>
				<text :class="isSelect?'cuIcon-roundcheckfill red':'cuIcon-round'" class="lg text-gray check" style="font-size: 36upx;"></text>
			</view>
		</view>
		<bottom-btn @tap="pay" :txt="'立即支付'"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSelect: true,
				time: 600,
				timer: null,
				timeArr: [],
				order_price: null,
				order_id: '',
				noClick: false,
				showPayBtn: false,
				showBlance:false
			}
		},
		onLoad(options) {
			console.log(options)
			this.order_price = options.order_money
			this.order_id = options.order_id
			this.countDown()
		},
		onShow() {
			
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			selectPayment() {
				this.isSelect = !this.isSelect
			},
			//去支付
			pay() {
				if(!this.isSelect){
					this.showToast('请选择支付方式')
					return
				}
				if(this.noClick){
					this.showToast('请勿重复点击')
					return
				}
				this.noClick = true
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Order/pay',
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.order_id
					},
					header: this.header,
					method: "POST",
					success: (res) => {
						console.log(res.data)
						// this.noClick = false
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
									uni.redirectTo({
										url: "../paySuccess/paySuccess?type=1&orderid=" + this.order_id
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
			},
			//十分钟倒计时
			countDown() {
				var _this = this
				this.timer = setInterval(function() {
					_this.time--
					if (_this.time == 0) {
						clearInterval(_this.timer)
						// uni.showToast({
						// 	title: '订单支付超时',
						// 	icon: 'none',
						// 	success: () => {
						// 		setTimeout(function() {
						// 			uni.reLaunch({
						// 				url: '../index/index'
						// 			})
						// 		}, 1500);
						// 	}
						// })
					}
					_this.timeArr = [parseInt(_this.time / 60).toString().padStart(2, '0'), parseInt(_this.time % 60).toString().padStart(
						2, '0')]
				}, 1000)
			}
		}
	}
</script>

<style>
	.money {
		text-align: center;
		margin-top: 80upx;
		margin-bottom: 50upx;
	}

	.payment {
		display: flex;
		justify-content: space-between;
		margin: 20upx 30upx;
		border-radius: 20upx;
		line-height: 100upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		padding: 0 40upx;
	}

	.title {
		margin: 0 50upx;
	}

	.txt {
		flex: 1;
		margin-left: 20upx;
		font-size: 26upx;
	}

	.time text {
		background-color: #ddd;
		padding: 0 8upx;
		margin: 0 5upx;
	}
</style>
