<template>
	<view>
		<view class="containA" v-if="isLoaing">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="message" v-if='!isNull'>
				<view class="express_status" v-if="expressInfo.deliverystatus==0">正在揽件</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==1">运输中</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==2">正在派件</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==3">已签收</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==4">派送失败</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==5">疑难件</view>
				<view class="express_status" v-if="expressInfo.deliverystatus==6">退件签收</view>
				<view>快递公司：{{expressInfo.expName}}</view>
				<view>快递单号：<text selectable='true'>{{expressInfo.number}}</text></view>
				<view>物流更新时间：{{expressInfo.updateTime}}</view>
			</view>
			<view v-if='isNull'>
				<view style="margin:30upx 30upx 0;line-height: 50upx;font-size: 32upx;">
					<view>快递单号：<text selectable='true'>{{expressInfo.number}}</text></view>
					<view>快递信息：{{tips}}</view>
				</view>
				<view class="null">
					<image src="../../static/index/search-null.png" mode="widthFix"></image>
					<view style="color: #aaa;margin-top: 10upx;text-align: center;">暂无物流信息</view>
				</view>
			</view>
			<view class="cu-timeline" v-else>
				<view class="cu-item" :class="index==0?'text-red cuIcon-deliver_fill':''" v-for="(item,index) in expressInfo.list"
				 :key='index'>
					<view class="time">
						{{item.time}}
					</view>
					<view class="content" :class="index==0?'bg-red':''">
						{{item.status}}
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
				expressInfo: null,
				isNull: false,
				tips: null
			}
		},
		onLoad(options) {
			console.log(options)
			this.orderid = options.orderid
			this.getExpressInfo()
		},
		methods: {
			getExpressInfo() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/order/expressInfo",
					data: {
						token: uni.getStorageSync('token'),
						order_id: this.orderid,
						shop_id: uni.getStorageSync('shop_id')
					},
					method: "POST",
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoaing = false
						if (res.data.status == 0) {
							if (res.data.data.status != 0) {
								this.tips = res.data.data.msg
								this.isNull = true
							}
							this.expressInfo = res.data.data.result
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
	.message {
		margin: 30upx 30upx 0;
	}

	.message>view {
		line-height: 50upx;
		font-size: 32upx;
	}

	.express_status {
		width: 200upx;
		line-height: 80upx !important;
		font-size: 40upx !important;
		font-weight: 600;
	}

	.cu-timeline>.cu-item {
		padding-left: 220upx;
		font-size: 28upx;
	}

	.time {
		position: absolute;
		top: 30upx;
		left: 10upx;
		width: 160upx;
		text-align: center;
		/* background-color: #fff; */
		z-index: 100;
	}

	.cu-timeline>.cu-item::after {
		left: 190upx;
	}

	.cu-timeline>.cu-item[class*="cuIcon-"]::before,
	.cu-timeline>.cu-item::before {
		left: 165upx;
		top: 30upx;
		font-size: 36upx;
	}

	.null {
		width: 300upx;
		margin: 200upx auto;
		text-align: center;
	}

	.null image {
		width: 90%;
	}
</style>
