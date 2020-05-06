<template>
	<view>
		<view class="order">
			<view class="order-top">订单信息</view>
			<view style="padding: 20upx 0;">
				<view v-for="(item,index) in orderDetail.list" :key="index">
					<view class="item">
						<view class="pic" :style="'background-image: url('+item.original_img+');'">
							<view class="goods_status" v-if="item.is_send==2">换货中</view>
							<view class="goods_status" v-if="item.is_send==3">退货中</view>
							<view class="goods_status" v-if="item.is_send==4">已换货</view>
							<view class="goods_status" v-if="item.is_send==5">已退货</view>
						</view>
						<view class="con">
							<view class="name">
								<view class="des">{{item.goods_name}}</view>
								<view>¥ {{item.final_price}}</view>
							</view>
							<view class="txt">
								<view class="remark" v-if="item.key_name">{{item.key_name}}</view>
								<view class="remark" v-else></view>
								<view>*{{item.goods_num}}</view>
							</view>
						</view>
					</view>
					<view class="bottom-btns">
						<button class="cu-btn round line-red" @tap="toReturnGoods(index,'退货')">退货退款</button>
					</view>
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
				afterSaleOrder: null,
				orderid: null,
				isShow:false,
				orderDetail:null
			}
		},
		onLoad(options) {
			console.log(options)
			this.orderid = options.orderid
			this.getReturnGoodsDetail()
		},
		methods: {
			//去退换货
			toReturnGoods(i,type) {
				uni.setStorageSync('typeTxt',type)
				uni.setStorageSync('returnGoods',this.orderDetail.list[i])
				uni.navigateTo({
					url: "../returnGoods/returnGoods"
				})
			},
			getReturnGoodsDetail() {
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
						this.orderDetail = res.data.data
						uni.setStorageSync('orderDetail', this.orderDetail)
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
	.bottom-btns {
		display: flex;
		justify-content: flex-end;
		padding: 0 15upx;
	}
	
	.bottom-btns button {
		height: 50upx;
		line-height: 50upx;
		width: 180upx;
		padding: 0;
	}
	.order {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		padding: 10upx 0;
	}

	.order-top {
		line-height: 60upx;
		padding: 0 30upx;
		border-bottom: 1upx solid #f1f1f1;
		font-size: 30upx;
	}

	.model-box {
		padding: 30upx 0;
		width: 90%;
		position: relative;
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
	.checkbox{
		position:relative;
		width: 40upx;
	}
	.checkbox text{
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.btn-group{
		padding: 20upx 0;
	}
	.btn-group button {
		height: 60upx;
		line-height: 60upx;
		width: 240upx;
		font-size: 24upx;
	}

	.item-box {
		padding: 20upx 0;
	}

	.item {
		padding: 15upx 20upx;
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
		padding-top: 15upx;
		position: relative;
	}

	.con .name {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
	}

	.remark {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		color: #888;
		font-size: 22upx;
		margin-right: 160upx;
		text-align: left;
	}
	.txt {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 10upx; 
		line-height: 40upx;
	}

	.des {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 28upx;
		margin-right: 40upx;
	}
</style>
