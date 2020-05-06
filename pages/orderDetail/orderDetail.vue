<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="order">
				<view class="order-top">订单号：{{orderDetail.order_sn}}</view>
				<view class="item-box">
					<view class="item" v-for="(item,index) in orderDetail.list" :key="index">
						<view class="pic" :style="'background-image: url('+item.original_img+');'">
							<view class="goods_status" v-if="item.is_send==2">换货中</view>
							<view class="goods_status" v-if="item.is_send==3">退货中</view>
							<view class="goods_status" v-if="item.is_send==4">已换货</view>
							<view class="goods_status" v-if="item.is_send==5">已退货</view>
						</view>
						<view class="con">
							<view class="name">
								<view class="des">{{item.goods_name}}</view>
								<view>¥<text style="margin-left: 5upx;">{{item.final_price}}</text></view>
							</view>
							<view class="txt">
								<view class="remark" v-if="item.key_name">{{item.key_name}}</view>
								<view class="remark" v-else></view>
								<view>*{{item.goods_num}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="message">
				<view class="msg-item" v-if="orderDetail.shipping_type==1">
					<view>收货地址</view>
					<view>{{orderDetail.address}}</view>
				</view>
				<view class="msg-item" v-if="orderDetail.shipping_type==1">
					<view>收货人姓名</view>
					<view>{{orderDetail.consignee}}</view>
				</view>
				<view class="msg-item" v-if="orderDetail.shipping_type==1">
					<view>手机号</view>
					<view>{{orderDetail.phone}}</view>
				</view>
				<view class="msg-item">
					<view>订单号</view>
					<view>{{orderDetail.order_sn}}</view>
				</view>
				<view class="msg-item">
					<view>下单时间</view>
					<view>{{orderDetail.add_time}}</view>
				</view>
				<view class="msg-item">
					<view>门店名称</view>
					<view>{{orderDetail.shop_name}}</view>
				</view>
				<!-- <view class="msg-item">
					<view>订单状态</view>
					<view class="red" v-if="orderDetail.flag=='WAITPAY'">待付款</view>
					<view class="red" v-if="orderDetail.flag=='CANCLED'">已取消</view>
					<view class="red" v-if="orderDetail.flag=='WAITDELIVER'">待发货</view>
					<view class="red" v-if="orderDetail.flag=='WAITRECEIVE'">待收货</view>
					<view class="red" v-if="orderDetail.flag=='HASRECEIVED'">已收货</view>
					<view class="red" v-if="orderDetail.flag=='FINISHED'">交易完成</view>
					<view class="red" v-if="orderDetail.flag=='DESTROYED'">订单作废</view>
					<view class="red" v-if="orderDetail.flag=='REFUNING'">退款中</view>
					<view class="red" v-if="orderDetail.flag=='REFUND'">退款成功</view>
					<view class="red" v-if="orderDetail.flag=='REFUSEREFUND'">退款失败</view>
				</view> -->
				<!-- <view class="msg-item" v-if="orderDetail.shipping_type==2">
					<view>订单状态</view>
					<view class="red">待自提</view>
				</view> -->
				<view class="msg-item">
					<view>优品券抵扣</view>
					<view>- ¥<text style="padding: 0 5upx;">{{orderDetail.coupon_price}}</text></view>
				</view>
				<view class="msg-item">
					<view>UP抵扣</view>
					<view>- ¥<text style="padding: 0 5upx;">{{orderDetail.integral_money}}</text></view>
				</view>
				<view class="msg-item">
					<view>余额抵扣</view>
					<view>- ¥<text style="padding: 0 5upx;">{{orderDetail.user_money}}</text></view>
				</view>
				<view class="total-msg" style="padding: 10upx 0;">
					<text>总计{{orderDetail.total_num}}件</text>
					<text style="margin: 0 20upx;">合计</text>
					<text style="color: red;">¥ {{orderDetail.total_amount}}</text>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='WAITPAY'">
					<button class="cu-btn round line-888" @tap="showModel('取消订单')">取消订单</button>
					<button class="cu-btn round line-red" style="margin-left: 30upx;" @tap="orderPay">付款</button>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='WAITDELIVER'">
					<button class="cu-btn round line-red" v-if="showBtn==1" @tap="returnMoney">申请退款</button>
					<button class="cu-btn round line-red" style="margin-left: 30upx;" v-if="orderDetail.shipping_type==2" @tap="showCodeMsg">查看自提信息</button>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='WAITRECEIVE'">
					<button class="cu-btn round line-888" @tap="checkLogistics">查看物流</button>
					<button class="cu-btn round line-red" style="margin-left: 30upx;" @tap="showModel('收货')">确认收货</button>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='HASRECEIVED'">
					<button class="cu-btn round line-888" @tap="checkLogistics">查看物流</button>
					<button class="cu-btn round line-red" style="margin-left: 30upx;" v-if="showBtn==1" @tap="toAftersale">申请售后</button>
				</view>
				<view class="bottom-btns" v-if="orderDetail.flag=='FINISHED'">
					<button class="cu-btn round line-888" @tap="checkLogistics">查看物流</button>
				</view>
			</view>
			<view class="cu-modal" :class="modelName=='showModel'?'show':''">
				<view class="cu-dialog box">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="margin-bottom: 40upx;font-size: 30upx;font-weight: 800;">确认{{modelTxt}}吗?</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
						<button class="cu-btn round bg-red shadow" @tap="sure">确认</button>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modelName=='codeMsg'?'show':''">
				<view class="cu-dialog box" style="width: 90%;">
					<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
					<view style="font-size: 32upx;font-weight: 800;margin-bottom: 10upx;">查看自提信息</view>
					<view style="margin-bottom: 20upx;">
						<view class="shipping-item">
							<text class="shipping_span1">自提码:</text>
							<text class="shipping_span2" selectable='true'>{{orderDetail.shipping_code}}</text>
						</view>
						<view class="shipping-item">
							<text class="shipping_span1">自提地址:</text>
							<text class="shipping_span2" selectable='true' v-if="shipping_address">{{shipping_address}}</text>
							<text class="shipping_span2" v-else>暂无</text>
						</view>
						<view class="shipping-item">
							<text class="shipping_span1">门店电话:</text>
							<text class="shipping_span2" selectable='true' v-if="shipping_phone">{{shipping_phone}}</text>
							<text class="shipping_span2" v-else>暂无</text>
						</view>
					</view>
					<view class="btns">
						<button class="cu-btn round bg-red shadow" style="width: 240upx;" @tap="closeModel">我知道了</button>
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
				isLoaing: true,
				orderid: null,
				orderDetail: null,
				modelName: '',
				modelTxt: '',
				showBtn: 0,
				shipping_address: null,
				shipping_phone: null
			}
		},
		onLoad(options) {
			this.orderid = options.orderid
			this.getOrderDetail()
			this.showBtn = options.aftersaleStatus
		},
		methods: {
			//查看自提信息
			showCodeMsg() {
				//获取自提地址
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/storeSelfAddress",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							let result = res.data.data
							this.shipping_address = result.province + result.city + result.area + result.detail
							this.shipping_phone = result.phone
						}
						this.modelName = 'codeMsg'
					}
				})
			},
			toReturnGoods() {
				uni.navigateTo({
					url: "../returnGoods/returnGoods"
				})
			},
			showModel(str) {
				this.modelTxt = str
				if (str == '删除订单') {
					this.showToast('该功能暂未开放')
					return
				}
				this.modelName = 'showModel'
			},
			getOrderDetail() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderdetail",
					data: {
						token: uni.getStorageSync('token'),
						id: this.orderid
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoaing = false
						this.orderDetail = res.data.data
						this.orderDetail.add_time = this.handleTime(this.orderDetail.add_time)
						this.orderDetail.total_price = parseFloat(this.orderDetail.total_price).toFixed(2)
						uni.setStorageSync('orderDetail', this.orderDetail)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//处理下单时间
			handleTime(time) {
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
					url: "../chooseAftersaleType/chooseAftersaleType?orderid="+this.orderid
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
							uni.showToast({
								title: '订单已取消',
								mask: true,
								success: () => {
									setTimeout(function() {
										uni.navigateBack()
									}, 1000);
								}
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//订单付款
			orderPay() {
				this.setheader()
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
									uni.redirectTo({
										url: "../paySuccess/paySuccess?type=1"
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//申请退款
			returnMoney() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/returnGoods",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.orderid,
						type: 0
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							uni.showToast({
								title: '已提交申请',
								mask: true,
								success: () => {
									setTimeout(function() {
										uni.navigateBack()
									}, 1000);
								}
							})
							return
						}
						this.showToast(res.data.msg)
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
						shop_id: uni.getStorageSync('shop_id'),
						token: uni.getStorageSync('token')
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
			//查看物流
			checkLogistics() {
				// this.showToast('该功能暂未开放')
				uni.navigateTo({
					url: '../expressInfo/expressInfo?orderid=' + this.orderid
				})
			},
			//提醒发货
			remindSend() {
				this.showToast('该功能暂未开放')
				return
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/remindSend",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						order_id: this.order_id,
						shop_id: uni.getStorageSync('user').shop_id
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
								mask: true,
								success: () => {
									setTimeout(function() {
										uni.navigateBack()
									}, 1000);
								}
							})
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
	page{
		background-color: #f7f7f7;
	}
	.order,
	.message {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		padding: 10upx 0 20upx;
		background-color: #fff;
	}

	.message {
		padding: 40upx 30upx;
	}

	.order-top {
		line-height: 60upx;
		padding: 0 30upx;
		font-size: 30upx;
		border-bottom: 1upx solid #f1f1f1;
	}

	.msg-item {
		display: flex;
		justify-content: space-between;
		padding: 12upx 0;
	}

	.msg-item>view {
		line-height: 40upx;
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
		width: 180upx;
		padding: 0;
	}

	.total-msg text {
		font-size: 32upx;
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
		position: relative;
		box-shadow: 0 0 10upx 2upx #eee;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
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

	.goods_status {
		position: absolute;
		bottom: 0;
		height: 40upx;
		line-height: 40upx;
		background-color: red;
		font-size: 24upx;
		width: 100%;
		text-align: center;
		color: #fff;
	}

	.shipping-item {
		display: flex;
		justify-content: space-between;
		text-align: left;
		line-height: 40upx;
		padding: 10upx 0;
	}

	.shipping_span1 {
		width: 150upx;
	}

	.shipping_span2 {
		flex: 1;
	}
</style>
