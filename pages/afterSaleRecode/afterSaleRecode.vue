<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view class="" v-else>
			<view class="null" v-if="isNull">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="text-align: center;color: #aaa;margin-top: 10upx;">暂无相关订单</view>
			</view>
			<view class="" v-else>
				<view class="list" v-for="(item,index) in orders" :key="index" @tap="toReturnDetail(index)">
					<view class="orderno">
						<view>订单号:{{item.order_sn}}</view>
						<view class="status" v-if='item.status==0'>待门店审核</view>
						<view class="status" v-if='item.status==1'>审核通过</view>
						<view class="status" v-if='item.status==2'>等待门店收货</view>
						<view class="status" v-if='item.status==3'>门店已收货并发货</view>
						<view class="status" v-if='item.status==4'>换货完成</view>
						<view class="status" v-if='item.status==5'>退款成功</view>
						<view class="status" v-if='item.status==6'>拒绝退换货</view>
						<view class="status" v-if='item.status==7'>用户取消</view>
						<view class="status" v-if='item.status==9'>已关闭</view>
					</view>
					<view class="item-box">
						<view class="item" v-for="(item,index2) in item.goods" :key="index2">
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
					<view class="item-bottom">
						<view class="">门店：{{item.shop_name}}</view>
						<view class="bottom-btns">
							<button class="cu-btn round line-red">查看详情</button>
							<button v-if="item.status==3" class="cu-btn round line-red" style="margin-left: 30upx;" @tap.stop="sureGet(index)">确认收货</button>
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
				isLoaing: true,
				orders: null,
				isNull: false
			}
		},
		onShow() {
			this.isLoaing = true
			this.getReturnOrders()
		},
		methods: {
			toReturnDetail(index) {
				uni.setStorageSync('returnDetail',this.orders[index])
				uni.navigateTo({
					url: '../returnDetail/returnDetail'
				})
			},
			sureGet(index) {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/afterGoodsAccomplish",
					data: {
						token: uni.getStorageSync('token'),
						id: uni.getStorageSync('returnDetail').id,
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if(res.data.status==0){
							uni.showToast({
								title:'退换货完成',
								icon:'success'
							})
							this.getReturnOrders()
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			getReturnOrders() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/Order/returnGoodsList",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.isLoaing = false
							this.orders = res.data.data.data
							if (this.orders.length == 0) {
								this.isNull = true
								return
							}
							for (var i = 0; i < this.orders.length; i++) {
								this.orders[i].final_price = this.orders[i].price
							}
						}
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
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
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
	.list {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		background-color: #fff;
	}

	.orderno {
		padding: 20upx 30upx 10upx;
		border-bottom: 1upx solid #f1f1f1;
		line-height: 40upx;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
	}


	.status {
		color: red;
		font-weight: 800;
	}

	.item-bottom {
		border-top: 1upx solid #f1f1f1;
		padding: 30upx;
	}

	.bottom-btns {
		display: flex;
		justify-content: flex-end;
	}

	.bottom-btns button {
		height: 50upx;
		line-height: 50upx;
		width: 180upx;
		padding: 0;
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}
</style>
