<template>
	<view>
		<view class="contain">
			<view class="list">
				<view class="item">
					<view class="txt">收货人</view>
					<view class="con">
						<input type="text" value="" v-model="name" placeholder="请填写姓名" />
					</view>
				</view>
				<view class="item">
					<view class="txt">省市区</view>
					<view class="con">
						<picker mode="region" @change="chooseAddress">
							<view>{{pickerAddress}}</view>
						</picker>
					</view>
				</view>
				<view class="item">
					<view class="txt">详细地址</view>
					<view class="con">
						<input type="text" value="" v-model="addressDetail" placeholder="如:xx街道xx小区xx栋xxx室" />
					</view>
				</view>
				<view class="item">
					<view class="txt">手机号</view>
					<view class="con">
						<input type="number" maxlength="11" v-model="mobile" placeholder="请填写手机号" />
					</view>
				</view>
			</view>
			<view class="cu-form-group" style="padding: 0;font-size: 30upx;">
				<view class="title" style="color: #666;">设置默认地址</view>
				<switch @change="setDefaultAddress" :class="isDefault?'checked':''" :checked="isDefault"></switch>
			</view>

		</view>
		<bottom-btn :txt="'保存地址'" @tap="saveAddress"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDefault: false,
				pickerAddress: '请选择省市区',
				pickerAddressList: [],
				name: '',
				addressDetail: '',
				mobile: '',
				switchA: false,
			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			//设置默认地址
			setDefaultAddress() {
				this.isDefault = !this.isDefault
			},
			//选择省市区
			chooseAddress(e) {
				console.log(e.detail.value)
				this.pickerAddressList = e.detail.value
				this.pickerAddress = this.pickerAddressList.join(' ')
			},
			//保存地址
			saveAddress() {
				if (this.name == '') {
					this.showToast('请填写收货人')
					return
				} else if (this.pickerAddress == '请选择省市区') {
					this.showToast('请选择省市区')
					return
				} else if (this.addressDetail == '') {
					this.showToast('请填写详细地址')
					return
				} else if (this.mobile == '') {
					this.showToast('请填写手机号')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/addressSave",
					data: {
						token: uni.getStorageSync('token'),
						consignee: this.name,
						province: this.pickerAddressList[0],
						city: this.pickerAddressList[1],
						district: this.pickerAddressList[2],
						address: this.addressDetail,
						mobile: this.mobile,
						is_default: this.isDefault ? '1' : '0',
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg.mobile) {
							this.showToast(res.data.msg.mobile)
							return
						}
						uni.navigateBack({
							url: "../myAddress/myAddress",
							success: () => {
								uni.showToast({
									title: '保存成功',
									icon: 'success'
								})
							}
						})
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
	.contain {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		padding: 15upx 30upx 30upx;
	}

	.item {
		display: flex;
		border-bottom: 1upx solid #F5F5F5;
		line-height: 45upx;
		padding: 20upx 0;
		font-size: 30upx;
	}

	.item .txt {
		width: 160upx;
	}

	.item .con {
		flex: 1;
	}

	.item .con input {
		width: 100%;
		height: 100%;
	}

	.checkbox {
		margin-top: 20upx;
	}
</style>
