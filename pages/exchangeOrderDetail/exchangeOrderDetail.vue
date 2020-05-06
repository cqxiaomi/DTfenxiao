<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view class="" v-else>
			<view class="order">
				<view class="order-top">订单号:{{orderDetail.point_outsn}}</view>
				<view class="item-box">
					<view class="item">
						<view class="pic">
							<image :src="orderDetail.pgoods_image" mode="widthFix"></image>
						</view>
						<view class="con">
							<view class="name">
								<view class="des">{{orderDetail.pgoods_name}}</view>
								<view style="white-space: nowrap;">上优品:{{orderDetail.pgoods_points}}</view>
							</view>
							<view class="txt">
								<view class="remark" v-if="orderDetail.pgoods_description">{{orderDetail.pgoods_description}}</view>
								<view class="remark" v-else></view>
								<view>*{{orderDetail.point_num}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message">
				<view class="msg-item">
					<view class="">收货地址</view>
					<view class="">{{orderDetail.point_address}}</view>
				</view>
				<view class="msg-item">
					<view class="">收货人姓名</view>
					<view class="">{{orderDetail.point_buyername}}</view>
				</view>
				<view class="msg-item">
					<view class="">手机号</view>
					<view class="">{{orderDetail.point_buyeremail}}</view>
				</view>
				<view class="msg-item">
					<view class="">订单号</view>
					<view class="">{{orderDetail.point_outsn}}</view>
				</view>
				<view class="msg-item">
					<view class="">下单时间</view>
					<view class="">{{orderDetail.pgoods_add_time}}</view>
				</view>
				<view class="msg-item">
					<view class="">订单状态</view>
					<view class="red" v-if="orderDetail.point_orderstate==1">待发货</view>
					<view class="red" v-if="orderDetail.point_orderstate==2">待收货</view>
					<view class="red" v-if="orderDetail.point_orderstate==3">已完成</view>
				</view>
				<view class="total-msg" style="padding: 10upx 0;">
					<text>总计{{orderDetail.point_num}}件</text>
					<text style="margin: 0 20upx;">总上优品</text>
					<text style="color: red;">{{orderDetail.point_allpoint}}</text>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='WAITRECEIVE'">
					<!-- <button class="cu-btn round line-888">查看物流</button> -->
					<button class="cu-btn round line-red" style="margin-left: 30upx;" @tap.stop="showModel('收货')">确认收货</button>
				</view>
				<!-- <view class="bottom-btns" v-if="orderDetail.flag=='FINISHED'">
					<button class="cu-btn round line-888" @tap.stop="showModel('删除订单')">删除订单</button>
				</view> -->
			</view>
			<view class="cu-modal" :class="modelName=='showModel'?'show':''">
				<view class="cu-dialog box">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="margin-bottom: 40upx;">确认{{modelTxt}}吗?</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
						<button class="cu-btn round bg-red shadow" @tap="sure">确认</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoaing:true,
				orderid: null,
				orderDetail: null,
				modelName: '',
				modelTxt: '',
				type:null
			}
		},
		onLoad(options) {
			// console.log(options)
			this.orderid = options.orderid
			this.getOrderDetail()
		},
		methods: {
			toReturnGoods() {
				uni.navigateTo({
					url: "../returnGoods/returnGoods"
				})
			},
			showModel(str) {
				this.modelTxt = str
				this.modelName = 'showModel'
			},
			getOrderDetail() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/scoreDetail",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.orderid
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoaing = false
						this.orderDetail = res.data.data
						this.orderDetail.pgoods_add_time = this.handleTime(this.orderDetail.pgoods_add_time)
						uni.setStorageSync('orderDetail', this.orderDetail)
					}
				})
			},
			//处理下单时间
			handleTime(time) {
				// console.log(time)
				let date = new Date(time * 1000)
				let Y = date.getFullYear().toString()
				let M = (date.getMonth() + 1).toString().padStart(2, '0')
				let D = date.getDate().toString().padStart(2, '0')
				let h = date.getHours().toString().padStart(2, '0')
				let m = date.getMinutes().toString().padStart(2, '0')
				let s = date.getSeconds().toString().padStart(2, '0')
				let newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
				return newTime
			},
			//跳转选择售后类型
			toAftersale() {
				uni.redirectTo({
					url: "../chooseAftersaleType/chooseAftersaleType"
				})
			},
			closeModel() {
				this.modelName = ''
			},
			//点击弹出框里的确认
			sure() {
				switch (this.modelTxt) {
					case '删除订单':
						this.sureDel()
						break;
					case '取消订单':
						this.cancleOrder()
						break;
					case '收货':
						this.sureGet()
						break;
					default:
						break;
				}
				this.closeModel()
			},
			//取消订单
			cancleOrder() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderCancel",
					data: {
						id: this.orderid,
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							prevPage.setData({
								"list": []
							}) //更新上一个页面列表数据为空
							uni.navigateBack({
								delta: 1,
								success: function(e) {
									var page = getCurrentPages().pop();
									if (page == undefined || page == null) return;
									page.onLoad();
								}
							}) //返回上一个页面更新数据
							// uni.showToast({
							// 	title: '订单已取消',
							// 	icon: 'success',
							// 	success: () => {
							// 		setTimeout(function(){
							// 			uni.navigateBack({
							// 				delta:1
							// 			})
							// 		},1500)
							// 	}
							// })
						}
					}
				})
			},
			//订单付款
			orderPay() {
				uni.request({
					url: this.websiteUrl + '/api/Order/pay',
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.orderid
					},
					header: this.header,
					method: "POST",
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.reLaunch({
										url: "../paySuccess/paySuccess?type=1"
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}

					}
				})
			},
			//删除订单
			sureDel() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderDelete",
					data: {
						order_id: this.order_id,
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							uni.showToast({
								title: '订单已删除',
								icon: 'success',
								success: () => {
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								}
							})
						}
					}
				})
			},
			//提醒发货
			remindSend() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/remindSend",
					data: {
						token: uni.getStorageSync('token'),
						order_id: this.order_id,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							this.showToast('已提醒商家尽快发货')
						}
					}
				})
			},
			//确认收货
			sureGet() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/confirmGet",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.orderid
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							uni.showToast({
								title: '已确认收货',
								icon: 'success',
								success: () => {
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.order,
	.message {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		padding: 10upx 0 20upx;
	}

	.message {
		padding: 40upx 30upx;
	}

	.order-top {
		line-height: 60upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #f1f1f1;
	}

	.msg-item {
		display: flex;
		justify-content: space-between;
		padding: 8upx 0;
	}

	.msg-item>view {
		line-height: 40upx;
		font-size: 24upx;
	}

	.msg-item>view:nth-child(1) {
		width: 140upx;
		margin-right: 20upx;
	}

	.msg-item>view:nth-child(2) {
		flex: 1;
		color: #888;
	}

	.bottom-btns {
		display: flex;
		justify-content: flex-end;
		margin-top: 30upx;
	}

	.bottom-btns button {
		height: 50upx;
		line-height: 50upx;
		font-size: 24upx;
		width: 180upx;
		padding: 0;
	}

	.total-msg text {
		font-size: 24upx;
	}

	.line-888 {
		color: #888;
	}

	.box {
		width: 70%;
		padding: 40upx 30upx 30upx;
	}
	.item-box {
		padding: 20upx 0;
	}
	
	.item {
		padding: 15upx 30upx;
		display: flex;
	}
	
	.item .pic {
		width: 140upx;
		height: 140upx;
		overflow: hidden;
		border-radius: 20upx;
		box-shadow: 0 0 10upx 2upx #eee;
	}
	
	.item .pic image {
		width: 100%;
		display: block;
	}
	
	.item .con {
		flex: 1;
		margin-left: 20upx;
		padding-top: 20upx;
		position: relative;
	}
	
	.con .name,
	.con .txt {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}
	
	.txt {
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 10upx; 
		line-height: 40upx;
	}
	
	.remark {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		color: #888;
		font-size: 22upx;
		margin-right: 100upx;
	}
	
	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 28upx;
		margin-right: 20upx;
	}
</style>
