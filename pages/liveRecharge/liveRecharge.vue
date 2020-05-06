<template>
	<view>
		<view class="title">
			<image src="../../static/mall/icon09.png" mode="widthFix"></image>
			月/季/年功能性充值
		</view>
		<view style="margin: 0 30upx;">
			<view class="box" :class="currentIndex==index?'red-border':''" v-for="(item,index) in options" :key="index" @tap="chooseItem(index)">
				<view style="line-height: 40upx;">
					<view style="font-weight: 800;">{{item.plan}}</view>
					<view style="font-size: 26upx;">{{item.time}}畅享看直播</view>
				</view>
				<view style="line-height: 80upx;font-size: 36upx;color: red;font-weight: 800;">UP {{item.price}}</view>
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
				currentIndex: 0,
				options: [{
						plan: '包月',
						time: '一个月',
						price: '1'
					},
					{
						plan: '包季',
						time: '三个月',
						price: '80'
					},
					{
						plan: '包年',
						time: '一年',
						price: '300'
					},
				]

			}
		},
		methods: {
			chooseItem(i) {
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



	.money {
		line-height: 80upx;
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

	.box {
		display: flex;
		justify-content: space-between;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
		border: 1upx solid #ddd;
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

	.red-border {
		background-color: #FFDFDF;
		border-color: red;
	}
</style>
