<template>
	<view>
		<view class="title">
			<image src="../../static/mall/icon8.png" mode="widthFix"></image>
			小视频充值
		</view>
		<view class="topup">
			<view class="topup-box" :class="currentIndex==index?'current-line':''" v-for="(item,index) in options" :key="index" @tap="chooseItem(index)">
				<view class="money">UP <text style="font-size: 36upx;">{{item.price}}</text></view>
				<view :class="currentIndex==index?'current-bg':''" style="border-top: 1upx solid #ccc;line-height: 50upx;">{{item.time}}秒直播</view>
			</view>
		</view>
		<view style="margin-top: 100upx;">
			<view style="padding: 0 30upx;line-height: 60upx;">支付方式</view>
			<view class="zhifu">
				<view style="position: relative;width: 60upx;">
					<image src="../../static/mall/icon2.png" mode="widthFix"></image>
				</view>
				<view style="flex: 1;margin-left: 30upx;">UP支付</view>
				<i class='iconfont iconjiegouxuanxuanzhong' style="color: red;font-size: 40upx;"></i>
			</view>
			<view class="btn" @tap="pay">确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				options:[
					{
						price:'10',
						time:'10'
					},
					{
						price:'15',
						time:'15'
					},
					{
						price:'20',
						time:'20'
					},
					{
						price:'30',
						time:'30'
					}
				]
			}
		},
		methods: {
			chooseItem(i){
				this.currentIndex = i
			},
			pay(){
				this.showToast('功能暂未开放')
			}
		}
	}
</script>

<style>
	.title {
		padding: 0 30upx;
		padding-left: 80upx;
		position: relative;
		line-height: 100upx;
	}

	.title image {
		width: 40upx;
		position: absolute;
		left: 30upx;
		top: 50%;
		transform: translateY(-50%);
		height: auto;
	}

	.topup {
		padding: 0 30upx;
		display: flex;
		justify-content: space-between;
	}

	.topup-box {
		width: 140upx;
		border-radius: 15upx;
		border: 1upx solid #ccc;
		text-align: center;
		box-sizing: border-box;
		overflow: hidden;
	}

	.money {
		line-height: 80upx;
		color: red;
	}

	.zhifu {
		padding: 0 30upx;
		border-top: 1upx solid #ddd;
		border-bottom: 1upx solid #ddd;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
	}

	.zhifu image {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		width: 100%;
		height: auto;
	}

	.btn {
		width: 540upx;
		margin: 50upx auto;
		background-color: #55AFFD;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		box-shadow: 0 3upx 10upx 3upx #ddd;
	}
	.current-line{
		border-color: red;
	}
	.current-bg{
		background-color: #FFDFDF;
		color: red;
		border-top-color: red !important;
	}
</style>
