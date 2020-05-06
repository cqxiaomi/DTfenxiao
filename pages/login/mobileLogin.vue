<template>
	<view>
		<view class="logo" v-if="!showChangePassword">
			<image src="../../static/mine/logo_03.png" mode="widthFix"></image>
			<view style="font-size: 72upx;position: relative;text-align: center;">
				<text class="logo-txt">大唐优品</text>
			</view>
		</view>
		<view class="form" v-if="!showChangePassword">
			<view class="input-box">
				<!-- <text class="cuIcon-mobile text-gray"></text> -->
				<i class="iconfont iconshouji"></i>
				<input type="number" v-model="mobile" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="input-box">
				<!-- <text class="cuIcon-lock text-gray"></text> -->
				<i class="iconfont iconmima"></i>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<view v-if="!state" class="code-btn cu-btn round line-red" @tap="getCode">{{getCodeTxt}}</view>
				<view v-if="state" class="code-btn time">{{time}}s</view>
			</view>
			<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 100%;margin: 20upx 0;height: 80upx;"
			 @tap="toNext">下一步</button>
			<!-- <view class="txt">
				<view @tap="toLogin">账号密码登录</view>
				<view class="">忘记密码</view>
			</view> -->
			<!-- <view class="otherLogin">第三方登录</view>
			<button open-type="getUserInfo" @getuserinfo="wxLogin" class="wx">
				<image src="../../static/mine/wxLOGO.png" mode="widthFix" style="display: block;"></image>
			</button> -->
		</view>
		<view class="form" v-else>
			<view style="font-size: 40upx;">设置密码</view>
			<view class="input-box">
				<!-- <i class="iconfont iconshouji"></i> -->
				<i class="iconfont iconmima"></i>
				<input type="text" :password="!canSee1" v-model="newPassword1" placeholder="请输入新密码" />
				<text class="text-gray" :class="canSee1?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee1"></text>
			</view>
			<view class="input-box">
				<i class="iconfont iconmima"></i>
				<input type="text" :password="!canSee2" v-model="newPassword2" placeholder="请再次确认新密码" />
				<text class="text-gray" :class="canSee2?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee2"></text>
			</view>
			<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 100%;margin: 20upx 0;height: 80upx;"
			 @tap="sureChange">确认修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canSee1: false,
				canSee2: false,
				mobile: '',
				code: '',
				state: false, //是否开启倒计时,
				time: 70, //总时间，单位秒
				getCodeTxt: '获取验证码',
				showChangePassword: false,
				newPassword1: '',
				newPassword2: '',
				sendSuccess: false
			}
		},
		methods: {
			sureChange() {
				if (this.newPassword1 == '') {
					this.showToast('请输入新密码')
					return
				} else if (this.newPassword2 == '') {
					this.showToast('请确认新密码')
					return
				} else if (this.newPassword1 != this.newPassword2) {
					this.showToast('两次密码不一致')
					return
				}
				uni.showLoading({
					title:'请稍等'
				})
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/user/editPwd',
					data: {
						phone: this.mobile,
						active_code: this.code,
						new_password: this.newPassword1,
						new_password2: this.newPassword2
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if (res.data.status == 0) {
							uni.navigateBack({
								delta: 1,
								success: () => {
									uni.showToast({
										title: '修改成功',
										icon: 'success'
									})
								}
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			changeSee1() {
				this.canSee1 = !this.canSee1
			},
			changeSee2() {
				this.canSee2 = !this.canSee2
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
				uni.showLoading({
					title:'请稍等'
				})
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/User/sendActiveCode',
					data: {
						phone: this.mobile
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if (res.data.status == 0) {
							this.showToast('验证码已发送')
							this.sendSuccess = true
							//开始倒计时
							this.state = true;
							//执行倒计时
							this.checkingTime();
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
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
			toNext() {
				if (this.mobile == '') {
					this.showToast('输入账号不能为空')
					return
				} else if (this.code == '') {
					this.showToast('验证码不能为空')
					return
				}
				if (!this.sendSuccess) {
					return
				}
				this.showChangePassword = true
			}
		}
	}
</script>

<style>
	.logo-txt {
		position: relative;
	}

	.logo-txt::after {
		width: 100upx;
		content: '(客户端)';
		position: absolute;
		bottom: 0;
		left: 100%;
		font-size: 24upx;
		color: red;
	}

	.logo {
		text-align: center;
		margin-bottom: 40upx;
		margin-top: 180upx;
	}

	.logo image {
		width: 200upx;
		margin-bottom: 20upx;
	}

	.form {
		width: 580upx;
		margin: 0 auto;
	}

	.form .input-box {
		display: flex;
		justify-content: space-between;
		margin: 30upx 0;
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
