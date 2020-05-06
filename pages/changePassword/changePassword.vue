<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="">原密码</view>
				<view class="input">
					<input type="text" :password="!canSee0" v-model="old_password" placeholder="请填写原密码" />
					<text class="text-gray" :class="canSee0?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee0"></text>
				</view>
			</view>
			<view class="item">
				<view class="">新密码</view>
				<view class="input">
					<input type="text" :password="!canSee1" v-model="new_password" placeholder="请填写新密码" />
					<text class="text-gray" :class="canSee1?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee1"></text>
				</view>
			</view>
			<view class="item">
				<view class="">确认密码</view>
				<view class="input">
					<input type="text" :password="!canSee2" v-model="confirm_password" placeholder="请确认新密码" />
					<text class="text-gray" :class="canSee2?'cuIcon-attention':'cuIcon-attentionforbid'" @tap="changeSee2"></text>
				</view>
			</view>
			<!-- <view style="margin-top: 20upx;font-size: 22upx;color: #888;letter-spacing: 1upx;">密码必须是6位数字</view> -->
		</view>
		<bottom-btn :txt="'确认修改'" @tap="confirmChange"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				old_password: '',
				new_password: '',
				confirm_password: '',
				canSee0: false,
				canSee1: false,
				canSee2: false,
			}
		},

		methods: {
			changeSee0() {
				this.canSee0 = !this.canSee0
			},
			changeSee1() {
				this.canSee1 = !this.canSee1
			},
			changeSee2() {
				this.canSee2 = !this.canSee2
			},
			confirmChange() {
				if (this.old_password == '') {
					this.showToast('请输入原密码')
					return
				} else if (this.new_password == '') {
					this.showToast('请输入新密码')
					return
				} else if (this.confirm_password == '') {
					this.showToast('请确认新密码')
					return
				} else if (this.new_password != this.confirm_password) {
					this.showToast('密码不一致,请重新设置新密码')
					this.new_password = this.confirm_password = ''
					return
				}
				uni.showLoading()
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/editPwd",
					data: {
						token: uni.getStorageSync('token'),
						old_pwd: this.old_password,
						new_pwd: this.new_password,
						confirm_pwd: this.confirm_password,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if (res.data.status == 0) {
							uni.navigateBack({
								delta:1,
								success:()=>{
									uni.showToast({
										title: "修改成功",
										icon: 'success'
									})
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
		}
	}
</script>

<style>
	.top {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 100;
		min-height: 88upx;
	}

	.list {
		margin: 40upx 30upx 0;
		border-radius: 20upx;
		box-shadow: 0 3upx 10upx rgba(0, 0, 0, 0.1);
		padding: 15upx 40upx 30upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f1f1f1;
		line-height: 60upx;
		padding: 15upx 0;
		font-size: 30upx;
	}

	.item>view:nth-child(1) {
		width: 140upx;
	}

	.item .input {
		flex: 1;
		line-height: 60upx;
		height: 60upx;
		display: flex;
		justify-content: space-between;
	}

	.item .input input {
		height: 60upx;
		flex: 1;
		margin-right: 20upx;
	}
</style>
