<template>
	<view>
		<view class="address-box" @tap="toChooseAddress">
			<image class="dizhi" src="../../static/index/dizhi_03.png"></image>
			<view class="msg" v-if="showAddress">
				<view class="name">{{addressMsg.name}}<text style="font-size: 22upx;color: #888;margin-left: 20upx;">{{addressMsg.mobile}}</text></view>
				<view class="address">{{addressMsg.address}}</view>
			</view>
			<view class="msg" v-else>请选择收货地址</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="order">
			<view class="top">
				<view class="pic">
					<image :src="orderDetail.pgoods_image" mode="widthFix"></image>
					<!-- <image src="../../static/mine/avatar.jpg" mode="widthFix"></image> -->
				</view>
				<view class="con">
					<view class="name">{{orderDetail.pgoods_name}}</view>
					<!-- <view class="name">商品名称</view>
					<view class="des">商品描述</view> -->
				</view>
				<view class="">
					<view class="jifen">
						<view class="">上优品:{{orderDetail.pgoods_points}}</view>
						<view class="">上优品:{{orderDetail.pgoods_points*2}}</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item">
					<view class="">兑换数量</view>
					<view class="">
						<view class="numbox">
							<view class="btn" @tap.stop="reduce">-</view>
							<view style="border-left: 1upx solid #888;border-right: 1upx solid #888;width: 50upx;text-align: center;font-size: 20upx;">{{num}}</view>
							<view class="btn" @tap.stop="add">+</view>
						</view>
					</view>
				</view>
				<!-- <view class="item">
					<view class="">配送方式</view>
					<view style="padding-left: 50upx;" @tap="choosePlan">
						<text>{{pickerTxt}}</text>
						<text style="padding-left: 10upx;" class="lg text-gray cuIcon-right"></text>
					</view>
				</view> -->
				<!-- <view class="item">
					<view class="">快递费</view>
					<view class="">¥ 0.00</view>
				</view> -->
				<view class="item">
					<view class="">订单备注</view>
					<view class="">
						<input style="height: 100%;box-sizing: border-box;text-align: right;color: #888;" type="text" v-model="user_note"
						 placeholder="选填" />
					</view>
				</view>
				<view class="item">
					<view class="">合计上优品</view>
					<view style="color: red;">{{totalPoint}}</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='phoneModel'?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">确认兑换该商品吗?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureExchange">确定</button>
				</view>
			</view>
		</view>
		<bottom-btn :txt="'立即兑换'" @tap="showModel"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressMsg: null,
				showAddress: false,
				num: 1,
				orderDetail: {},
				plan: ['快递', '自提'],
				pickerTxt: '快递',
				modelName: '',
				user_note: '',
				totalPoint:0
			}
		},
		onLoad() {
			this.orderDetail = uni.getStorageSync('exchangeOrder')
			console.log(this.orderDetail)
			this.totalPoint = this.orderDetail.pgoods_points
			this.getDefaultAddress()
		},
		onShow() {
			//订单地址显示
			uni.getStorageSync('selectAddress')
			if (uni.getStorageSync('selectAddress')) {
				this.addressMsg = uni.getStorageSync('selectAddress')
				console.log(this.addressMsg)
				this.showAddress = true
				uni.removeStorageSync('selectAddress')
			} else {
				this.showAddress = false
			}
		},
		methods: {
			reduce() {
				if (this.num == 1) {
					return
				}
				this.num--
				this.countPoint()
			},
			add() {
				this.num++
				this.countPoint()
			},
			countPoint(){
				this.totalPoint = this.num*parseFloat(this.orderDetail.pgoods_points) 
			},
			showModel() {
				if (!this.showAddress) {
					this.showToast('请先选择收货地址')
					return
				}
				this.modelName = 'phoneModel'
			},
			closeModel() {
				this.modelName = ''
			},
			//确认兑换商品
			sureExchange() {
				this.closeModel()
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/api/Order/createScoreOrder',
					data: {
						token: uni.getStorageSync('token'),
						goods_id: this.orderDetail.pgoods_id,
						goods_num: this.num,
						address_id: this.addressMsg.address_id,
						message: this.user_note,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						if (res.data.status == 0) {
							console.log(res.data)
							uni.redirectTo({
								url: '../paySuccess/paySuccess?type=2&&orderid=' + res.data.order_id
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//判断当前用户是否设置默认地址
			getDefaultAddress() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserAddress/addressList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						let addressList = res.data.data.lists
						if (addressList.length == 0) {
							return
						}
						for (var i = 0; i < addressList.length; i++) {
							if (addressList[i].is_default == 1) {
								this.addressMsg = {
									address_id: addressList[i].address_id,
									name: addressList[i].consignee,
									mobile: addressList[i].mobile,
									address: addressList[i].province + addressList[i].city + addressList[i].district + addressList[i].address
								}
							}
						}
						//没有设置默认地址
						if (this.addressMsg) {
							this.showAddress = true
						} else {
							this.showAddress = false
						}
					}
				})
			},
			toChooseAddress() {
				uni.navigateTo({
					url: "../myAddress/myAddress?fromView=order"
				})
			},
			//选择配送方式
			choosePlan() {
				// console.log(e)
				uni.showActionSheet({
					itemList: this.plan,
					success: (res) => {
						this.pickerTxt = this.plan[res.tapIndex]
					}
				})
			}
		}
	}
</script>

<style>
	.address-box {
		margin: 40upx 30upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		padding: 30upx 70upx 30upx 90upx;
		position: relative;
	}

	.address-box>view {
		line-height: 40upx;
	}

	.address-box>text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.address-box>.dizhi {
		position: absolute;
		left: 30upx;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		top: 50%;
		transform: translateY(-50%);
	}

	.address-box>text:nth-child(3) {
		right: 30upx;
		font-size: 32upx;
	}

	.address {
		font-size: 22upx;
		color: #666;
	}

	.order {
		margin: 0 30upx 140upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		padding: 30upx;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.pic {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.pic image {
		width: 100%;
		display: block;
	}

	.numbox {
		line-height: 40upx;
		border: 1upx solid #888;
		border-radius: 8upx;
		display: flex;
		font-size: 24upx;
		float: right;
		margin: 10upx 0;
	}

	.numbox>.btn {
		width: 40upx;
		text-align: center;
	}

	.con {
		margin: 0 20upx;
		flex: 1;
	}

	.con .name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin-bottom: 10upx;
		line-height: 36upx;
	}

	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		line-height: 36upx;
		font-size: 22upx;
		color: #888;
	}

	.price {
		text-align: right;
		line-height: 72upx;
	}

	.list {
		margin-top: 20upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		line-height: 70upx;
		height: 70upx;
	}

	.item>view {
		font-size: 30upx;
		box-sizing: border-box;
	}

	.jifen>view:nth-child(1) {
		font-weight: 600;
		color: red;
		font-size: 28upx;
	}

	.jifen>view:nth-child(2) {
		color: #aaa;
		font-size: 24upx;
		text-decoration: line-through;
		text-align: right;
	}
</style>
