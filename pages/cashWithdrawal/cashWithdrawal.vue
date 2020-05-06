<template>
	<view>
		<view class="money-box">
			<view style="margin-bottom: 10upx;display: flex;justify-content: space-between;font-size: 30upx;line-height: 40upx;">
				<view style="color: #333;">提现金额</view>
				<view style="color: #aaa;" @tap="toCashRecode">查看提现记录</view>
			</view>
			<view class="money-input">
				<text style="font-size: 48upx;font-weight: 600;">¥</text>
				<input type="digit" v-model="money" placeholder="请输入金额" placeholder-class="myfont" @focus="clearMoney" />
				<text class="myfont" @tap="getAllMoney">全部</text>
			</view>
			<view style="margin-top: 15upx;font-size: 24upx;color: #888;letter-spacing: 1upx;">额外扣除 ¥{{getFee}} 元(费率{{WithdrawRate*100}}%)</view>
			<view style="font-size: 22upx;color: #aaa;padding: 30upx 0 20upx;"><text style="color: red;">Tips：</text>提现金额限额（{{min_cash}}
				- {{max_cash}}），每天可申请提现{{cash_times}}次</view>
		</view>
		<view class="pay-box">
			<view class="title">提现到</view>
			<view class="payment-box">
				<view class="payment">
					<i class='iconfont iconweixinzhifu' style="color: #6BCC03;font-size: 40upx;"></i>
					<text class="txt">微信</text>
				</view>
			</view>
			<!-- <view class="payment-box">
				<view class="payment">
					<i class='iconfont iconyinxingqia' style="color: #6BCC03;font-size: 40upx;"></i>
					<text class="txt">银行卡</text>
				</view>
				<view style="margin-top: 20upx;">
					<view class="payment-input">
						<view class="">银行名称：</view>
						<input type="text" v-model="bankName" placeholder="请填写银行名称" placeholder-class="p_font">
					</view>
					<view class="payment-input">
						<view class="">开户人：</view>
						<input type="text" v-model="name" placeholder="请填写开户人姓名" placeholder-class="p_font">
					</view>
					<view class="payment-input">
						<view class="">银行卡号：</view>
						<input type="number" v-model="bankNumber" placeholder="请填写银行卡号" placeholder-class="p_font">
					</view>
				</view>
			</view> -->
		</view>
		<bottom-btn @tap="withdrawal" :txt="'申请提现'"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '',
				noclick: false,
				bankName: '',
				bankNumber: '',
				name: '',
				min_cash: 0,
				max_cash: 0,
				WithdrawRate: 0,
				cash_times: 0
			}
		},
		onShow() {
			this.noclick = false
		},
		onLoad() {
			this.getWithdrawInfo()
		},
		methods: {
			//获取提现信息
			getWithdrawInfo() {
				uni.request({
					url: this.websiteUrl + "/api/GetSystem/withdrawInfo",
					data: {
						token: 'a0z6f0w15dpmawle',
						shop_id: uni.getStorageSync('shop_id')
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.min_cash = res.data.data.min_cash
							this.max_cash = res.data.data.max_cash
							this.WithdrawRate = res.data.data.WithdrawRate
							this.cash_times = res.data.data.cash_times
						}
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//获取全部可提现金额
			getAllMoney() {
				this.money = uni.getStorageSync('user_money')
			},
			clearMoney() {
				this.money = ''
			},
			//跳转提现记录
			toCashRecode() {
				uni.navigateTo({
					url: "../cashRecode/cashRecode"
				})
			},
			bindWxid() {
				this.wxidBind = true
			},
			withdrawal() {
				if (this.noclick) {
					this.showToast('请勿重复点击')
					return
				}
				if (this.money == '') {
					this.showToast('请输入提现金额')
					return
				}
				if (parseFloat(this.money) > parseFloat(this.max_cash) || parseFloat(this.money) < parseFloat(this.min_cash)) {
					this.showToast('提现金额限额（' + this.min_cash + ' - ' + this.max_cash + '）')
					return
				}
				this.noclick = true
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/withdrawal",
					data: {
						withdrawal_number: this.money,
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method:'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.noclick = false
						if (res.data.status == 0) {
							this.money = ''
							uni.showToast({
								title: '已提交申请',
								icon: 'success',
								success: function() {
									setTimeout(function() {
										uni.navigateBack()
									}, 1500);
								}
							})
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			}
		},
		computed: {
			getFee: function() {
				if (this.money) {
					return (this.money * parseFloat(this.WithdrawRate)).toFixed(2)
				} else {
					return '0.00'
				}
			}
		}
	}
</script>

<style>
	.money-box {
		margin: 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		padding: 20upx 40upx 0;
	}

	.money-input {
		display: flex;
		justify-content: space-between;
		line-height: 80upx;
		height: 80upx;
		border-bottom: 1upx solid #f1f1f1;
	}

	.money-input input {
		flex: 1;
		line-height: 80upx;
		height: 80upx;
		padding: 0 20upx;
		font-size: 36upx;
	}

	.payment {
		display: flex;
		justify-content: space-between;
		line-height: 50upx;
	}

	.payment-box {
		margin: 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		padding: 20upx 30upx;
	}

	.payment-input {
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		height: 60upx;
		margin: 20upx 0;
	}

	.payment-input>view {
		width: 150upx;
	}

	.payment-input input {
		height: 100%;
		flex: 1;
		border-radius: 10upx;
		border: 1upx solid #ddd;
		padding: 0 15upx;
	}

	.p_font {
		color: #ccc;
	}

	.title {
		margin: 0 70upx;
		font-size: 30upx;
		color: #333;
	}

	.txt {
		flex: 1;
		margin-left: 20upx;
		font-size: 30upx;
	}

	.bottom {
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

	.myfont {
		font-size: 30upx;
		color: #888;
	}

	.weixin {
		margin-top: 10upx;
		font-size: 22upx;
		color: #888;
		letter-spacing: 1upx;
	}
</style>
