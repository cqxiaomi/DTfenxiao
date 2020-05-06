<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in problems" :key='index' @tap="toIntroduction(item)">
				<text>{{item}}</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problems:['退换货','会员升级','返利规则']
			}
		},
		methods: {
			toIntroduction(item){
				uni.navigateTo({
					url:'../introduction/introduction?title='+item
				})
			}
		}
	}
</script>

<style>
	.list {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		padding: 15upx 40upx 30upx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f1f1f1;
		font-size: 30upx;
		line-height: 90upx;
	}

	.item>text:nth-child(2) {
		font-size: 26upx;
		color: #ddd;
	}
</style>
