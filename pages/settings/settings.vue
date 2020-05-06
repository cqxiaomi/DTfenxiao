<template>
	<view>
		<view class="list">
			<view class="item" @tap="toPage('../myAddress/myAddress')">
				<text>地址管理</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="item" @tap="toPage('../commonProblem/commonProblem')">
				<text>常见问题</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<!-- <view class="item" @tap="toPage('../questions/questions')">
				<text>意见反馈</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view> -->
			<view class="item" @tap="clearStorage()">
				<text>清空缓存</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="item" @tap="toPage('../aboutUs/aboutUs')">
				<text>关于我们</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showBtn: false
			}
		},
		onShow() {
			console.log(this.$common.mobileMsg)
			console.log(uni.getStorageSync('mobile'))
			if (uni.getStorageSync('mobile')) {
				this.showBtn = true
			} else {
				this.showBtn = false
			}
		},
		methods: {
			//退出登录
			signOut() {
				uni.showLoading({
					title:'正在退出'
				})
				uni.request({
					url: this.websiteUrl + '/api/GetSystem/userLogout',
					data: {
						token: 'a0z6f0w15dpmawle',
						user_id: uni.getStorageSync('user_id'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if (res.data.status == 0) {
							uni.reLaunch({
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
			},
			//跳转
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			//清空缓存
			clearStorage() {
				uni.showLoading({
					title:"清除缓存中"
				})
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res);
						let code = res.code
						uni.request({
							url: this.websiteUrl + '/api/User/wxLogin',
							data: {
								code: code,
							},
							method: "POST",
							success: (res) => {
								console.log(res.data)
								if (res && res.header && res.header['Set-Cookie']) {
									uni.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
								}
								if (res.data.status == 0) {
									uni.setStorageSync("token", res.data.data.token)
									uni.setStorageSync("mobile", res.data.data.mobile)
									uni.setStorageSync("user_id", res.data.data.user_id)
									uni.showToast({
										title:'缓存已清空'
									})
									return
								}
								this.showToast(res.data.msg)
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.list {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		padding: 15upx 40upx 30upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f1f1f1;
		line-height: 90upx;
		font-size: 30upx;
	}

	.item>text:nth-child(2) {
		font-size: 26upx;
		color: #ddd;
	}
</style>
