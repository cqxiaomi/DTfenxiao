<template>
	<view>
		<view class="item-box">
			<view class="item" v-for="(item,index) in goods" :key="index">
				<view class="pic">
					<!-- <image src="../static/mine/avatar.jpg" mode="widthFix"></image> -->
					<image :src="item.original_img" mode="widthFix"></image>
				</view>
				<view class="con">
					<view class="name">
						<view class="des">{{item.goods_name}}</view>
						<view>¥<text style="margin-left: 5upx;">{{item.final_price}}</text></view>
					</view>
					<view class="txt">
						<view class="remark">{{item.goods_remark}}</view>
						<view>*{{item.goods_num}}</view>
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
				
			};
		},
		props: {
			goods: Array,
			default: []
		},
		created() {
			// console.log(this.goods)
		}
	}
</script>

<style>
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
		border: 1upx solid #DDDDDD;
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
