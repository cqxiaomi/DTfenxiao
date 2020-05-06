<template>
	<view>
		<view class="containA" v-if="isLoading">
			<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:300upx;margin-top: 40%;"></image>
		</view>
		<view v-else>
			<view class="null" v-if="isNull">
				<image src="../../static/index/store-null.png" mode="widthFix"></image>
				<view style="font-size: 24upx;text-align: center;color: #aaa;margin-top: 10upx;">暂无门店信息</view>
			</view>
			<view v-else>
				<view class="bg" v-if="storeCenterMsg.cover_img" :style="'background-image: url('+storeCenterMsg.cover_img+');'">
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);"></view>
				</view>
				<view class="bg" v-else>
					<image src="../../static/mine/storeList.jpg" style="width: 100%;" mode="widthFix"></image>
					<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);"></view>
				</view>
				<view class="card">
					<view class="shop-top">
						<view class="shop-logo" v-if="storeCenterMsg.logo" :style="'background-image: url('+storeCenterMsg.logo+');'"></view>
						<view class="shop-logo" v-else>
							<image src="../../static/mine/touxiang(1).jpeg" mode="widthFix"></image>
						</view>
						<view class="shopper-box">
							<view class="shop-name" style="font-size: 36upx;font-weight: 600;">{{storeCenterMsg.shop_name}}</view>
							<view class="shopper" style="font-size: 24upx;color: #666;padding-top: 10upx;">店长：{{storeCenterMsg.shopper_name}}</view>
						</view>
						<view class="to-shop-btn">
							<button class="cu-btn bg-red round" style="font-size: 24upx;" @tap="toShop">进入店铺</button>
						</view>
					</view>
					<view class="list">
						<view class="list-item">
							<view>手机号:</view>
							<view v-if="storeCenterMsg.shopper_phone">{{storeCenterMsg.shopper_phone}}</view>
							<view v-else>暂无</view>
							<view v-if="storeCenterMsg.shopper_phone">
								<i class="iconfont icondadianhua" @tap="takePhone(storeCenterMsg.shopper_phone)"></i>
							</view>
						</view>
						<view class="list-item">
							<view>固定电话:</view>
							<view v-if="storeCenterMsg.shop_phone">{{storeCenterMsg.shop_phone}}</view>
							<view v-else>暂无</view>
							<view v-if="storeCenterMsg.shop_phone">
								<i class="iconfont icondadianhua" @tap="takePhone(storeCenterMsg.shop_phone)"></i>
							</view>
						</view>
						<view class="list-item">
							<view>客服电话:</view>
							<view v-if="storeCenterMsg.service_phone">{{storeCenterMsg.service_phone}}</view>
							<view v-else>暂无</view>
							<view v-if="storeCenterMsg.service_phone">
								<i class="iconfont icondadianhua" @tap="takePhone(storeCenterMsg.service_phone)"></i>
							</view>
						</view>
						<view class="list-item">
							<view>营业时间:</view>
							<view v-if="storeCenterMsg.start_time||storeCenterMsg.end_time">{{storeCenterMsg.start_time}} -
								{{storeCenterMsg.end_time}}</view>
							<view v-else>暂无</view>
						</view>
						<view class="list-item">
							<view>联系人:</view>
							<view v-if="storeCenterMsg.shopper_name">{{storeCenterMsg.shopper_name}}</view>
							<view v-else>暂无</view>
						</view>
						<view class="list-item">
							<view>联系地址:</view>
							<view v-if="storeCenterMsg.shop_address">{{storeCenterMsg.shop_address}}</view>
							<view v-else>暂无</view>
						</view>
						<view class="btn">
							<button class="cu-btn bg-red round shadow-blur" @tap="toShopTeam">查看我的下级</button>
							<button class="cu-btn bg-red round shadow-blur" @tap="toCode">生成二维码</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modelName=='phoneModel'?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">电话：{{phone}}，是否拨打电话?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureTakePhone">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				imgUrl: this.imgUrl,
				modelName: '',
				storeCenterMsg: null,
				phone: null,
				isNull: false,
				shop_id: null
			}
		},
		onLoad() {
			this.getStoreMsg()
		},
		methods: {
			toShopTeam() {
				uni.navigateTo({
					url: '../myTeam/shopTeam?shop_name=' + this.storeCenterMsg.shop_name
				})
			},
			toCode() {
				console.log('生成二维码')
				uni.navigateTo({
					url: '../myTeam/codeShare'
				})
			},
			toShop() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			takePhone(phone) {
				this.phone = phone
				this.modelName = 'phoneModel'
			},
			closeModel() {
				this.modelName = ''
			},
			sureTakePhone() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
				this.closeModel()
			},
			getStoreMsg() {
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/UserCenter/getStoreInfo",
					data: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id')
					},
					header: this.header,
					success: (res) => {
						console.log(res.data)
						this.isLoading = false
						if (res.data.status == 0) {
							this.storeCenterMsg = res.data.data
							return
						}
						this.showToast()
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
		}
	}
</script>

<style>
	.shop-top {
		padding: 15upx 30upx;
		display: flex;
		justify-content: space-between;
	}

	.shop-logo {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
		overflow: hidden;
		background-position: center;
		background-size: cover;
		box-shadow: 0 6upx 6upx 0 #ddd;
		background-repeat: no-repeat;
	}

	.shopper-box {
		flex: 1;
		padding: 0 20upx;
	}

	.btn {
		position: absolute;
		bottom: 20upx;
		width: 590upx;
		height: 80upx;
		display: flex;
		justify-content: space-around;
	}

	.btn>button {
		height: 80upx;
		width: 260upx;
	}

	.null {
		width: 250upx;
		margin: 320upx auto;
	}

	.null image {
		width: 100%;
	}

	.bg {
		width: 690upx;
		margin: 40upx 30upx;
		height: 400upx;
		border-radius: 20upx;
		position: fixed;
		background-size: cover;
		overflow: hidden;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.card {
		width: 650upx;
		position: fixed;
		top: 320upx;
		left: 50upx;
		bottom: 50upx;
		box-shadow: 0 6upx 6upx 0 #ddd;
		border-radius: 20upx;
		background-color: #fff;
		padding: 20upx 0;
	}

	.avatar {
		box-shadow: 0 4upx 15upx rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}

	.avatar-pic {
		width: 180upx;
		height: 180upx;
		margin: 8upx;
		border-radius: 50%;
		background-size: cover;
		background-position: center center;
		overflow: hidden;
		background-repeat: no-repeat;
	}

	.card .name {
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		font-size: 30upx;
	}

	.card .name view {
		line-height: 80upx;
		height: 80upx;
	}

	.goods {
		padding: 30upx;
		border-bottom: 2upx solid #f1f1f1;
		color: #666;
		font-size: 30upx;
	}

	.list {
		padding: 15upx 30upx;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f8f8f8;
		line-height: 40upx;
		padding: 20upx 0;
		font-size: 30upx;
		color: #666;
	}

	.list-item>view:nth-child(1) {
		width: 140upx;
	}

	.list-item view:nth-child(2) {
		flex: 1;
	}

	.icondadianhua {
		font-size: 28upx;
	}
</style>
