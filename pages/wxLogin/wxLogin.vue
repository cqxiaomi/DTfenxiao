<template>
	<view>
		<view class="con">
			<view class="top">
				<image class="logo" src="../../static/mine/logo_03.png" mode="widthFix"></image>
				<view class="title" style="font-size: 60upx;margin-top: 10upx;font-weight: 600;">大唐优品</view>
			</view>
			<view class="txt" style="margin: 40upx 20upx;line-height: 40upx; font-size: 24upx;color: #888;letter-spacing: 2upx;">{{showRelogin?"由于长时间未操作，您的登录状态已过期，如需要正常使用，请重新登录":"您暂未授权大唐优品小程序获取你的信息，将无法正常使用小程序的功能。如需要正常使用，请先授权"}}</view>
			<button style="margin-bottom: 30upx;" type="primary" open-type="getUserInfo" @getuserinfo="wxLogin">{{showRelogin?"重新登录":"授权登录"}}</button>
			<button type="primary" plain="true" @tap="cancalLogin">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				codeQuery: null,
				fromView: null,
				showRelogin: false
			}
		},
		onLoad(options) {
			if (options.type == "reLogin") {
				this.showRelogin = true
			}
			if (options.codeQuery) {
				this.codeQuery = options.codeQuery
			}
			if (options.fromView) {
				this.fromView = options.fromView
			}
		},
		methods: {
			wxLogin() {
				uni.getUserInfo({
					lang: "zh_CN",
					provider: 'weixin',
					success: (res) => {
						console.log(res)
						this.$common.wxMsg = res.userInfo
						this.userInfo = this.$common.wxMsg
						this.login()
					},
					fail: () => {
						console.log('授权失败')
					}
				})
			},
			cancalLogin() {
				uni.navigateBack()
			},
			//上传更新用户微信昵称头像信息
			updateUserinfo() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/User/updateUserInfo',
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						avataUrl: this.userInfo.avatarUrl,
						gender: this.userInfo.gender,
						nickName: this.userInfo.nickName,
						address: this.userInfo.country + this.userInfo.province + this.userInfo.city
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log('微信昵称头像已经上传更新')
						console.log(res.data)
					},
				})
			},
			login() {
				uni.showLoading({
					title:'授权中'
				})
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res);
						let data = {
							code: res.code
						}
						if (this.$common.otherProgramUserid) {
							data.id = this.$common.otherProgramUserid
						}
						let _this = this
						uni.request({
							url: this.websiteUrl + '/api/User/wxLogin',
							data: data,
							method: "POST",
							success: (res) => {
								console.log(res.data.data)
								if (res && res.header && res.header['Set-Cookie']) {
									uni.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
								}
								if (res.data.status == 0) {
									uni.setStorageSync("token", res.data.data.token)
									uni.setStorageSync("mobile", res.data.data.mobile)
									uni.setStorageSync("user_id", res.data.data.user_id)
									this.updateUserinfo()
									if (this.codeQuery) {
										this.bindShop()
									}
									if (this.fromView == "toConfirmOrder") {
										uni.redirectTo({
											url: "../confirmOrder/confirmOrder"
										})
									} else {
										uni.navigateBack()
									}
									return
								}
								this.showToast(res.data.msg)
							},
							fail() {
								console.log('失败')
								_this.showToast('登录失败')
							}
						})
					}
				})
			},
			bindShop() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/userCenter/bindShop',
					data: {
						token: uni.getStorageSync('token'),
						user_id: this.codeQuery.split('_')[0],
						shop_id: this.codeQuery.split('_')[1]
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.showToast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.con {
		margin: 0 60upx;
	}

	.top {
		margin-top: 100upx;
		text-align: center;
	}

	.logo {
		width: 200upx;
		height: auto;
	}
</style>
