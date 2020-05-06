<template>
	<view>
		<view class="Integral" v-for="(item,index) in Integrals" :key="index">
			<view class="subtitle">
				<view class="type">添加下级返利</view>
				<view class="jifen">上优品:200</view>
			</view>
			<view class="con">
				<view class="orderno">订单号:199305682950573</view>
				<view class="date" style="letter-spacing: 1upx;">2019-05-21</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Integrals:[1,2,3,4,5,6,7]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.Integral {
		margin: 40upx 30upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		padding: 20upx 30upx;
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
		line-height: 45upx;
	}
	.jifen {
		font-weight: 600;
	}

	.date,.orderno {
		color: #888;
		font-size: 28upx;
	}
	.con{
		line-height:50upx;
		height:100upx;
	}
</style>
