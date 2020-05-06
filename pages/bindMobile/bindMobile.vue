<template>
	<view>
		<view class="form">
			<view class="input-box">
				<!-- <text class="cuIcon-mobile text-gray"></text> -->
				<i class="iconfont iconshouji"></i>
				<input type="number" v-model="mobile" placeholder="请输入手机号" />
			</view>
			<view class="input-box">
				<!-- <text class="cuIcon-lock text-gray"></text> -->
				<i class="iconfont iconmima"></i>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<view v-if="!state" class="code-btn cu-btn round line-red" @tap="getCode">{{getCodeTxt}}</view>
				<view v-if="state" class="code-btn time">{{time}}s</view>
			</view>
			<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 100%;margin: 20upx 0;height: 80upx;"
			 @tap="bindMobile">绑定手机号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canSee: false,
				// mobile: '15915407513',
				mobile: '',
				code: '',
				state: false, //是否开启倒计时,
				time: 70, //总时间，单位秒
				getCodeTxt: '获取验证码'
			}
		},
		onLoad() {

		},
		methods: {
			changeSee() {
				this.canSee = !this.canSee
			},
			toLogin() {
				uni.redirectTo({
					url: "./login"
				})
			},
			//点击获取验证码
			getCode() {
				if (this.mobile == '') {
					this.showToast('请输入手机号码')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/UserCenter/sendBindActiveCode',
					data: {
						token: uni.getStorageSync('token'),
						phone: this.mobile,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.showToast('验证码已发送')
							//开始倒计时
							this.state = true;
							//执行倒计时
							this.checkingTime();
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//倒计时
			checkingTime() {
				var _this = this
				var timer = setInterval(function() {
					_this.time--
					if (_this.time <= 0) {
						clearInterval(timer)
						_this.state = false;
						_this.getCodeTxt = '重新获取'
						_this.time = 70
					}
				}, 1000)
			},
			//绑定手机号
			bindMobile() {
				if (this.mobile == '') {
					this.showToast('输入手机号不能为空')
					return
				} else if (this.code == '') {
					this.showToast('验证码不能为空')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/bindUserPnone",
					data: {
						token: uni.getStorageSync('token'),
						phone: this.mobile,
						active_code: this.code,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.navigateBack({
								delta: 1,
								success: () => {
									uni.showToast({
										title: '绑定成功',
										icon: 'success'
									})
								}
							})
							uni.setStorageSync('mobile',this.mobile)
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
	
	.logo {
		text-align: center;
		margin-bottom: 40upx;
		margin-top: 160upx;
	}

	.logo image {
		width: 200upx;
		margin-bottom: 20upx;
	}

	.form {
		width: 660upx;
		margin: 30upx auto 0;
	}

	.form .input-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30upx;
		border-bottom: 1upx solid #F1F1F1;
		height: 80upx;
		line-height: 80upx;
	}

	.form .txt {
		display: flex;
		justify-content: space-between;
		color: #888;
	}

	.input-box text {
		font-size: 40upx;
	}

	.input-box i {
		font-size: 40upx;
		color: #888;
	}

	input {
		flex: 1;
		padding: 0 15upx;
		height: 100%;
		box-sizing: border-box;
	}

	.form .txt view {
		font-size: 24upx;
	}

	.code-btn {
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;
		margin: 10upx 0;
		padding: 0;
		text-align: center;
		color: red;
	}

	.wx {
		width: 100upx;
		border-radius: 50%;
		padding: 0;
	}

	.otherLogin {
		width: 160upx;
		margin: 60upx auto 40upx;
		text-align: center;
		position: relative;
		color: #AAAAAA;
	}

	.otherLogin::before,
	.otherLogin::after {
		position: absolute;
		width: 100%;
		height: 1upx;
		background-color: #aaa;
		content: '';
		top: 50%;
	}

	.otherLogin::before {
		left: -180upx;
	}

	.otherLogin::after {
		right: -180upx;
	}
</style>
