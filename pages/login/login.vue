<template>
	<view>
		<view class="logo">
			<image src="../../static/mine/logo_03.png" mode="widthFix"></image>
			<view style="font-size: 72upx;position: relative;text-align: center;">
				<text class="logo-txt">大唐优品</text>
			</view>
		</view>
		<view class="form">
			<view class="input-box">
				<i class="iconfont iconshouji"></i>
				<input type="number" value="" maxlength="11" v-model="mobile" placeholder="请输入账号" />
			</view>
			<view class="input-box">
				<i class="iconfont iconmima"></i>
				<input type="text" :password="!canSee" v-model="password" value="" placeholder="请输入密码" />
				<text class="text-gray" :class="canSee?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee"></text>
			</view>
			<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 100%;margin: 20upx 0;height: 80upx;"
			 @tap="login">立即登录</button>
			<view class="txt">
				<view class=""></view>
				<view @tap='toMobileLogin' style="font-size: 28upx;">忘记密码？</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canSee: false,
				mobile: '',
				password: '',
				user_id: null
			}
		},
		methods: {
			changeSee() {
				this.canSee = !this.canSee
			},
			toMobileLogin() {
				uni.navigateTo({
					url: "./mobileLogin"
				})
			},
			//账号密码登录
			login() {
				if (this.mobile == '') {
					this.showToast('输入账号不能为空')
					return
				} else if (this.password == '') {
					this.showToast('输入密码不能为空')
					return
				}
				uni.showLoading({
					title: '正在登录'
				})
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/user/login",
					data: {
						phone: this.mobile,
						pwd: this.password
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						uni.hideLoading()
						console.log(res.data)
						if (res.data.status == 0) {
							uni.setStorageSync('token', res.data.data.token)
							uni.setStorageSync('user_level', res.data.data.user_level)
							if(this.password=='123456'){
								this.$common.showTip = true
							}
							uni.switchTab({
								url: '../index/index'
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
		font-size: 30upx;
	}

	.wx {
		width: 100upx;
		border-radius: 50%;
		padding: 0;
	}

	.wxlogin-btn {
		margin: 0 100upx;
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
