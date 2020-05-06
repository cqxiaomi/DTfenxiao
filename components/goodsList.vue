<template>
	<view>
		<view class="goodsList">
			<view class="goods-item" v-for="(item,index) in goods" :key="index" @tap="toDetail(item.goods_id,item.shop_id)">
				<view class="pic">
					<image :src="item.original_img==''?'../static/mine/default.jpg':item.original_img" lazy-load="true" mode="aspectFill"
					 :data-index="index"></image>
					 <view class="ziying" v-if="fromView=='fromSearch'">平台自营</view>
				</view>
				<view class="con">
					<view class="goodsname">{{item.goods_name}}</view>
					<view style="letter-spacing: 2upx;font-size: 28upx;padding: 10upx 0;">¥ {{item.price}}</view>
					<view style="font-size: 24upx;color: #959595;">销量：<text style="letter-spacing: 2upx;">{{item.sales_volume}}</text>件</view>
				</view>
				<image class="tip" src="../static/index/tip.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['goods','fromView'],
		methods: {
			toDetail(goodsid,shop_id) {
				uni.setStorageSync("shop_id",shop_id)
				uni.navigateTo({
					url: "../../pages/goodsDetail/goodsDetail?id=" + goodsid
				})
			},
		}
	}
</script>

<style>
	.goodsList {
		display: flex;
		justify-content: space-between;
		margin: 40upx 30upx 0;
		flex-wrap: wrap;
	}

	.goods-item {
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.2);
		width: 48%;
		margin-bottom: 60upx;
		padding-bottom: 20upx;
		position: relative;
	}

	.tip {
		position: absolute;
		width: 20upx;
		bottom: 26upx;
		right: 30upx;
	}

	.goods-item .pic {
		width: 270upx;
		height: 270upx;
		border-radius: 20upx;
		overflow: hidden;
		position: relative;
		top: -30upx;
		margin: 0 auto;
	}
	.ziying{
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #FE2337;
		color: #fff;
		border-top-left-radius: 20upx;
		line-height: 40upx;
		padding: 0 15upx;
		font-weight: 600;
		font-size: 26upx;
	}

	.goods-item .pic image {
		width: 100%;
		display: block;
	}

	.goods-item .con view {
		width: 270upx;
		margin: 0 auto;
		position: relative;
		top: -5upx;
	}

	.goodsname {
		font-weight: 600;
		font-size: 30upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
