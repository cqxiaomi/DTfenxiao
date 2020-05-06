<template>
	<view>
		<view class="title">
			<view :class="currentIndex==index?'under':''" @tap="chooseOptions(index)" v-for="(item,index) in navs" :key="index">{{item}}</view>
		</view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="null" v-if="isNull">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无相关订单</view>
			</view>
			<view class="order-box" v-else>
				<view class="list" v-for="(item,index) in orders" :key="index" @tap="toOrderDetail(index,item.order_id)">
					<view class="orderno">
						<view>订单号：{{item.order_sn}}</view>
						<view class="status" v-if="item.flag=='WAITPAY'">待付款</view>
						<view class="status" v-if="item.flag=='CANCLED'">已取消</view>
						<view class="status" v-if="item.flag=='WAITDELIVER'">待发货</view>
						<view class="status" v-if="item.flag=='WAITRECEIVE'">待收货</view>
						<view class="status" v-if="item.flag=='HASRECEIVED'">已收货</view>
						<view class="status" v-if="item.flag=='FINISHED'">交易完成</view>
						<view class="status" v-if="item.flag=='DESTROYED'">订单作废</view>
						<view class="status" v-if="item.flag=='REFUNING'">申请退款中</view>
						<view class="status" v-if="item.flag=='REFUND'">退款成功</view>
						<view class="status" v-if="item.flag=='REFUSEREFUND'">拒绝退款</view>
					</view>
					<view class="item-box">
						<view class="item" v-for="(item,index) in item.list" :key="index">
							<view class="pic" :style="'background-image: url('+item.original_img+');'">
								<!-- <view class="goods_status" v-if="item.is_send==2||item.is_send==3">售后中</view>
								<view class="goods_status" v-if="item.is_send==4||item.is_send==5">售后完成</view> -->
							</view>
							<view class="con">
								<view class="name">
									<view class="des">{{item.goods_name}}</view>
									<view>¥ <text style="margin-left: 5upx;">{{item.final_price}}</text></view>
								</view>
								<view class="txt">
									<view class="remark" v-if="item.key_name">{{item.key_name}}</view>
									<view class="remark" v-else></view>
									<view>*{{item.goods_num}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="item-bottom">
						<view class="total-msg">
							<view>
								<text style="margin-right: 20upx;">总计{{item.total_num}}件</text>
								<text>合计<text style="color: red;margin-left: 20upx;">¥ {{item.total_amount}}</text></text>
							</view>
							<view>门店：{{item.shop_name}}</view>
						</view>
						<view class="bottom-btns" v-if="item.flag=='WAITPAY'">
							<button class="cu-btn round line-888" @tap.stop="showModel(index,'取消订单')">取消订单</button>
							<button class="cu-btn round line-red" style="margin-left: 30upx;">去付款</button>
						</view>
						<view class="bottom-btns" v-if="item.flag=='WAITDELIVER'">
							<button class="cu-btn round line-888">查看详情</button>
							<button class="cu-btn round line-red" style="margin-left: 30upx;" v-if="showBtn==1" @tap.stop="showModel(index,'申请退款')">申请退款</button>
						</view>
						<view class="bottom-btns" v-if="item.flag=='WAITRECEIVE'">
							<button class="cu-btn round line-888" v-if="item.shipping_type==1" @tap.stop="checkLogistics(item.order_id)">查看物流</button>
							<button class="cu-btn round line-red" style="margin-left: 30upx;" @tap.stop="showModel(index,'收货')">确认收货</button>
						</view>
						<view class="bottom-btns" v-if="item.flag=='HASRECEIVED'">
							<button class="cu-btn round line-888" v-if="item.shipping_type==1" @tap.stop="checkLogistics(item.order_id)">查看物流</button>
							<button class="cu-btn round line-red" style="margin-left: 30upx;" v-if="showBtn==1" @tap.stop="toAftersale(item.order_id)">申请售后</button>
						</view>
						<view class="bottom-btns" v-if="item.flag=='FINISHED'">
							<button class="cu-btn round line-888" v-if="item.shipping_type==1" @tap.stop="checkLogistics(item.order_id)">查看物流</button>
						</view>
					</view>
				</view>
				<view class="cu-modal" :class="modelName=='showModel'?'show':''">
					<view class="cu-dialog box">
						<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
						<view style="margin-bottom: 40upx;font-size: 30upx;font-weight: 800;">确认{{tipTxt}}吗?</view>
						<view class="btns">
							<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
							<button class="cu-btn round bg-red shadow" @tap="sure">确认</button>
						</view>
					</view>
				</view>
				<end-tip></end-tip>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navs: ['全部', '待付款', '待发货', '待收货', '已收货', '已完成'],
				currentIndex: 0,
				orders: [],
				page: 1,
				isNull: false,
				stopLoad: false,
				modelName: '',
				modelIndex: null,
				tipTxt: '',
				isLoading: true,
				showBtn: 0
			}
		},
		onLoad(options) {
			console.log(options)
			this.currentIndex = parseFloat(options.status) + 1
		},
		onShow() {
			this.checkType()
		},
		methods: {
			chooseOptions(index) {
				this.currentIndex = index
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
				this.checkType()
			},
			//判断订单类型
			checkType() {
				this.page = 1
				this.isLoading = true
				this.isNull = this.stopLoad = false
				let type
				switch (this.currentIndex) {
					case 0:
						type = ''
						break;
					case 1:
						type = 'WAITPAY'
						break;
					case 2:
						type = 'WAITDELIVER'
						this.getAftersaleBtn()
						break;
					case 3:
						type = 'WAITRECEIVE'
						break;
					case 4:
						type = 'HASRECEIVED'
						this.getAftersaleBtn()
						break;
					case 5:
						type = 'FINISHED'
						break;
				}
				this.getOrderList(type)
			},
			//获取订单列表
			getOrderList(type) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderList",
					data: {
						token: uni.getStorageSync('token'),
						type: type,
						page: this.page,
						pagesize: 6
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.orders = res.data.data
							this.isLoading = false
							if (this.orders.length == 0) {
								this.isNull = true
								return
							}
							for (let i = 0; i < this.orders.length; i++) {
								let totalNum = 0
								for (let j = 0; j < this.orders[i].list.length; j++) {
									totalNum += parseFloat(this.orders[i].list[j].goods_num)
								}
								this.orders[i].total_num = totalNum
							}
							return
						}
						this.showToast(res.data.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			//加载更多订单
			loadmore() {
				if (this.stopLoad) {
					return
				}
				this.page++
				let type
				switch (this.currentIndex) {
					case 0:
						type = ''
						break;
					case 1:
						type = 'WAITPAY'
						break;
					case 2:
						type = 'WAITDELIVER'
						break;
					case 3:
						type = 'WAITRECEIVE'
						break;
					case 4:
						type = 'HASRECEIVED'
						break;
					case 5:
						type = 'FINISHED'
						break;
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						type: type,
						page: this.page,
						pagesize: 6
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.data.length == 0) {
							this.stopLoad = true
							return
						}
						for (let i = 0; i < res.data.data.length; i++) {
							let totalNum = 0
							for (let j = 0; j < res.data.data[i].list.length; j++) {
								totalNum += parseFloat(res.data.data[i].list[j].goods_num)
							}
							res.data.data[i].total_num = totalNum
							this.orders.push(res.data.data[i])
						}
						console.log(this.orders)
					}
				})
			},
			//获取后台状态是否显示售后
			getAftersaleBtn() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/check_shouhou",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.showBtn = res.data.status
					}
				})
			},
			//删除订单
			sureDel() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderDelete",
					data: {
						order_id: this.orders[this.modelIndex].order_id,
						shop_id: uni.getStorageSync('shop_id'),
						token: uni.getStorageSync('token')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						this.closeModel()
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							uni.showToast({
								title: '订单已删除',
								icon: 'success'
							})
							this.checkType()
						}
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
						order_id: this.orders[this.modelIndex].order_id,
						type: 0
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.msg == '操作成功') {
							uni.showToast({
								title: '已申请退款',
								icon: 'success'
							})
							this.checkType()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//取消订单
			cancleOrder() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/orderCancel",
					data: {
						id: this.orders[this.modelIndex].order_id,
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.showToast({
								title: '订单已取消',
								icon: 'success',
								duration:1000
							})
							this.checkType()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//提醒发货
			remindSend(index) {
				this.showToast('该功能暂未开放')
				return
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/remindSend",
					data: {
						token: uni.getStorageSync('token'),
						order_id: this.orders[index].order_id,
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
			//查看物流
			checkLogistics(orderid) {
				// this.showToast('该功能暂未开放')
				// return
				uni.navigateTo({
					url: '../expressInfo/expressInfo?orderid=' + orderid
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
						order_id: this.orders[this.modelIndex].order_id
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.closeModel()
						if (res.data.msg == '操作成功') {
							// this.orders.splice(this.modelIndex, 1)
							uni.showToast({
								title: '已确认收货',
								icon: 'success'
							})
							this.checkType()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			//显示操作确认弹窗
			showModel(index, str) {
				this.modelIndex = index
				this.tipTxt = str
				if (str == '删除订单') {
					this.showToast('该功能暂未开放')
					return
				}
				this.modelName = "showModel"
			},
			//点击弹窗里的确认
			sure() {
				console.log(this.tipTxt)
				switch (this.tipTxt) {
					case '取消订单':
						this.cancleOrder()
						break;
					case '删除订单':
						this.sureDel()
						break;
					case '申请退款':
						this.returnMoney()
						break;
					case '收货':
						this.sureGet()
						break;
					default:
						break;
				}
				this.closeModel()
			},
			//关闭弹窗
			closeModel() {
				this.modelName = ''
			},
			//跳转选择售后类型
			toAftersale(orderid) {
				uni.navigateTo({
					url: "../chooseAftersaleType/chooseAftersaleType?orderid=" + orderid
				})
			},
			//跳转查看订单详情
			toOrderDetail(index, orderid) {
				uni.navigateTo({
					url: "../orderDetail/orderDetail?orderid=" + orderid + "&aftersaleStatus=" + this.showBtn
				})
			}
		},
		//触底加载更多订单
		onReachBottom() {
			this.loadmore()
		},
		//下拉刷新
		onPullDownRefresh() {
			uni.startPullDownRefresh({
				success: () => {
					console.log('下拉刷新了页面')
					this.checkType()
					uni.stopPullDownRefresh()
				}
			})
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.title {
		display: flex;
		justify-content: space-around;
		padding: 20upx 50upx;
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #fff;
		z-index: 100;
	}

	.title>view {
		position: relative;
		height: 50upx;
		line-height: 50upx;
		padding: 0 10upx;
	}

	.under {
		color: red;
		position: relative;
	}

	.under::after {
		content: "";
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		height: 6upx;
		border-radius: 3upx;
		background-color: #F7756A;
	}

	.order-box {
		margin: 100upx 0 120upx;
	}

	.bottom {
		position: fixed;
		width: 100%;
		border: 1upx solid red;
		display: flex;
		bottom: 0;
	}

	.bottom>view {
		width: 50%;
		line-height: 90upx;
		height: 90upx;
		text-align: center;
	}

	.list {
		margin: 20upx 30upx 40upx;
		padding: 20upx 0;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		background-color: #fff;
	}

	.orderno {
		padding: 0 30upx 10upx;
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
		border-bottom: 1upx solid #f1f1f1;
		font-size: 30upx;
	}

	.status {
		color: red;
		font-weight: 800;
	}

	.item-bottom {
		padding: 30upx;
		border-top: 1upx solid #f1f1f1;
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
	.total-msg{
		display: flex;
		justify-content: space-between;
	}
	.total-msg text {
		font-size: 30upx;
	}

	.line-888 {
		color: #888;
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
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
		font-size: 30upx;
		margin-right: 20upx;
	}
</style>
