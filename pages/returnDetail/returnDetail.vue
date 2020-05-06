<template>
	<view>
		<view class="top2">
			<view class="title" v-if="returnDetail.status==0&&returnDetail.type == 0">退款申请已提交,请耐心等待门店审核</view>
			<view class="title" v-if="returnDetail.status==0&&returnDetail.type == 1">退货申请已提交,请耐心等待门店审核</view>
			<view class="title" v-if="returnDetail.status==0&&returnDetail.type == 2">换货申请已提交,请耐心等待门店审核</view>		
			<view class="title" v-if="returnDetail.status==1&&returnDetail.type == 0">门店已同意您的退款申请</view>
			<view class="title" v-if="returnDetail.status==1&&returnDetail.type == 1">门店已同意您的退货，请尽快寄出商品</view>
			<view class="title" v-if="returnDetail.status==1&&returnDetail.type == 2">门店已同意您的换货，请尽快寄出商品</view>
			<view class="title" v-if="returnDetail.status==2&&returnDetail.type == 1">快递信息已提交,请耐心等待门店收货并退款</view>
			<view class="title" v-if="returnDetail.status==2&&returnDetail.type == 2">快递信息已提交,请耐心等待门店收货并重新发货</view>
			<view class="title" v-if="returnDetail.status==3&&returnDetail.type == 1">门店已收到您寄出的退货商品，等待退款</view>
			<view class="title" v-if="returnDetail.status==3&&returnDetail.type == 2">门店已收到您寄出的换货商品，并重新发货</view>
			<view class="title" v-if="returnDetail.status==4">换货完成</view>
			<view class="title" v-if="returnDetail.status==5">退款成功</view>
			<view class="title" v-if="returnDetail.status==6">门店已拒绝您的申请</view>
			<view class="title" v-if="returnDetail.status==7">已取消</view>
			<view class="title" v-if="returnDetail.status==8">退货完成</view>
			<view class="title" v-if="returnDetail.status==9">门店已拒绝您的申请</view>
			<view class="" v-if="returnDetail.status==1&&showCompany">
				<view class="inputbox">
					<view class="inputbox-l">快递公司</view>
					<view class="inputbox-r" v-if="showMsg">
						<picker mode="selector" style="flex: 1;" :range="company" range-key="shipping_name" @change="chooseCompany">
							<view class="select-company">
								<view>{{pickerCompany.shipping_name}}</view>
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</picker>
					</view>
					<view v-else>{{pickerCompany.shipping_name}}</view>
				</view>
				<view class="inputbox">
					<view class="inputbox-l">快递单号</view>
					<view class="inputbox-r" v-if="showMsg">
						<input type="text" v-model="courierNumber" placeholder="请填写快递单号" />
						<view style="display: flex;color: #aaa;font-size: 24upx;" @tap="scanCode">
							<i class="iconfont iconsaoma" style='font-size: 32upx;margin-right: 8upx;'></i>
							<text>点击扫码</text>
						</view>
					</view>
					<view v-else>{{courierNumber}}</view>
				</view>
			</view>
		</view>

		<view class="order">
			<view class="order-top">{{typeTxt}}信息</view>
			<view class="item-box">
				<view class="item" v-for="(item,index) in returnDetail.goods" :key="index">
					<view class="pic" :style="'background-image: url('+item.original_img+');'"></view>
					<view class="con">
						<view class="name">
							<view class="des">{{item.goods_name}}</view>
							<view>¥<text style="margin-left: 5upx;">{{item.price}}</text></view>
						</view>
						<view class="txt">
							<view class="remark" v-if="item.key_name">{{item.key_name}}</view>
							<view class="remark" v-else></view>
							<view>*{{item.goods_num}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="list-item" v-if="typeTxt=='退货'">
				<view class="span">退款金额</view>
				<view class="price" style="color: red;font-weight: 600;">¥ {{returnMoney}}</view>
			</view> -->
			<view class="list-item" v-if="typeTxt !== '退款'">
				<view class="span">{{typeTxt}}原因</view>
				<view class="span2">{{returnDetail.reason}}</view>
			</view>
			<view class="list-item" v-if="typeTxt !== '退款'">
				<view class="span">{{typeTxt}}理由</view>
				<view class="span2">{{returnDetail.describe?returnDetail.describe:'暂无'}}</view>
			</view>
			<view class="list-item">
				<view class="span">门店名称</view>
				<view class="span2">{{returnDetail.shop_name}}</view>
			</view>
			<view class="list-item">
				<view class="span">申请时间</view>
				<view class="span2">{{returnDetail.addtime}}</view>
			</view>
			<view class="list-item">
				<view class="span">售后图片</view>
				<view class="span2" v-if="returnDetail.imgs">
					<image :src="returnDetail.imgs" style="width: 300upx;border-radius: 10upx;" mode="widthFix"></image>
				</view>
				<view class="span2" v-else>暂无</view>
			</view>
		</view>
		<bottom-btn v-if="returnDetail.status==0" :txt="'撤销申请'" @tap="showModel"></bottom-btn>
		<view v-if="returnDetail.status==1" class="bottom1">
			<view style="color: red;background-color: #fff;" @tap="showModel">撤销申请</view>
			<view style="color: #fff;background-color: red;" @tap="submitMsg">提交快递信息</view>
		</view>
		<view class="cu-modal" :class="isShowModel?'show':''">
			<view class="cu-dialog box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">确认撤销申请吗?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="cancleReturn">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company: null,
				returnDetail: null,
				pickerCompany: {
					shipping_name: '请选择快递公司'
				},
				courierNumber: '',
				typeTxt: '',
				returnMoney: null,
				showMsg: true,
				isShowModel: false,
				showCompany:true
			}
		},
		onLoad() {
			this.returnDetail = uni.getStorageSync('returnDetail')
			this.returnDetail.addtime = this.handleTime(this.returnDetail.addtime)
			console.log(this.returnDetail)
			console.log(this.returnDetail.type)
			if (this.returnDetail.type == 0) {
				this.typeTxt = '退款'
				this.showCompany = false
			} else if (this.returnDetail.type == 1) {
				this.typeTxt = '退货'
			} else if (this.returnDetail.type == 2) {
				this.typeTxt = '换货'
			}
			this.getCompanys()
		},
		methods: {
			//获取物流公司信息
			getCompanys() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/addExpressInfo",
					data: {
						shop_id: uni.getStorageSync('shop_id'),
						token: uni.getStorageSync('token')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.company = res.data.data
						}
					}
				})
			},
			//选择快递公司
			chooseCompany(e) {
				let index = e.detail.value
				this.pickerCompany = this.company[index]
			},
			showModel() {
				this.isShowModel = true
			},
			closeModel() {
				this.isShowModel = false
			},
			//扫码
			scanCode() {
				uni.scanCode({
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.courierNumber = res.result
					}
				});
			},
			//提交快递信息
			submitMsg() {
				if (this.pickerCompany.shipping_name == '请选择快递公司') {
					this.showToast('请选择快递公司')
					return
				} else if (this.courierNumber == '') {
					this.showToast('请填写快递单号')
					return
				}
				this.showMsg = false
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/addExpressInfo",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						return_goods_id: uni.getStorageSync('returnDetail').id,
						shipping_id: this.pickerCompany.shipping_id,
						shipping_code: this.courierNumber
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.showToast({
								title: '信息已提交',
								icon: 'success',
								success: () => {
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 1000);
								}
							})
							return
						}
						this.showToast(res.data.msg)
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
			//撤销退换货申请
			cancleReturn() {
				this.closeModel()
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/cancelReturnGoods",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						return_goods_id: uni.getStorageSync('returnDetail').id
					},
					method: 'POST',
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.showToast({
								title: '已撤销申请',
								icon: 'success',
								success: () => {
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
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
	.top,
	.top2 {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		padding: 10upx 0 30upx;
		background-color: #fff;
	}

	.order {
		margin-bottom: 140upx;
	}

	.top2 {
		padding: 20upx 30upx 30upx;
	}

	.top2 .title {
		line-height: 40upx;
		font-size: 30upx;
		color: red;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #f1f1f1;
		font-weight: 800;
	}

	.top {
		height: 180upx;
		text-align: center;
		font-size: 24upx;
		color: red;
		padding: 30upx 0 0;
	}

	.inputbox {
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		padding: 10upx 0;
		border-bottom: 1upx solid #f1f1f1;
	}

	.inputbox input {
		height: 60upx;
		flex: 1;
		margin-right: 20upx;
	}

	.inputbox-l {
		width: 140upx;
		margin-right: 20rpx;
	}

	.inputbox-r,
	.select-company {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}


	.order-top {
		line-height: 60upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #f1f1f1;
		font-size: 30upx;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 15upx 30upx;
		line-height: 40upx;
		font-size: 30upx;
	}

	.list-item .span {
		width: 160upx;
	}
	.list-item .span2 {
		flex: 1;
		overflow: hidden;
	}

	.reason {
		flex: 1;
		background-color: #f1f1f1;
		border-radius: 10upx;
		display: flex;
		justify-content: space-between;
		padding: 0 20upx;
	}

	.photo {
		margin: 15upx 30upx 0;
		padding: 20upx 0 0;
		border-top: 1upx solid #f1f1f1;
	}

	.photo .con {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
		text-align: center;
		margin: 20upx auto;
		border: 1upx solid #AAAAAA;
		color: #aaa;
	}

	.bottom1 {
		position: fixed;
		width: 100%;
		border: 1upx solid red;
		display: flex;
		bottom: 0;
	}

	.bottom1>view {
		width: 50%;
		line-height: 90upx;
		height: 90upx;
		text-align: center;
	}

	.reason-box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
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
</style>
