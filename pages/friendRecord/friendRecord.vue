<template>
	<view>
		<view class="list">
			<view class="list-item" v-for="(item,index) in recordlist" :key="index">
				<view class="msg">
					<view style="font-size: 28upx;text-align: left;">{{item.name}}</view>
					<view style="font-size: 26upx;text-align: center;">{{item.tel}}</view>
					<view style="font-size: 24upx;text-align: right;color: #888;letter-spacing: 1upx;">{{item.time}}</view>
				</view>
				<view class="btns2" v-if="!item.status">
					<button class="cu-btn round line-red" @tap="handIn(index)">提交门店审核</button>
					<button class="cu-btn round line-red" style="margin-left: 30upx;">取消</button>
				</view>
				<view class="wait" v-else>待门店审核</view>
			</view>
		</view>
		<view class="cu-modal" :class="showModel?'show':''">
			<view class="cu-dialog phone-box">
				<text class="lg text-gray cuIcon-close close" @tap="closeModel"></text>
				<view style="margin-bottom: 40upx;">是否提交审核?</view>
				<view class="btns">
					<button class="cu-btn round bg-red shadow" @tap="closeModel">取消</button>
					<button class="cu-btn round bg-red shadow" @tap="sureSubmit">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordlist: [{
						name: "风月",
						tel: 15183475965,
						time: "2019-05-21",
						status:false
					},
					{
						name: "我的巧克力",
						tel: 15183475965,
						time: "2019-05-21",
						status:false
					}, {
						name: "往后余生hh",
						tel: 15183475965,
						time: "2019-05-21",
						status:false
					}, {
						name: "hello",
						tel: 15183475965,
						time: "2019-05-21",
						status:false
					}
				],
				showModel:false,
				itemIndex:0
			}
		},
		methods: {
			handIn(index) {
				this.itemIndex = index
				this.showModel = true
			},
			sureSubmit(){
				this.showModel = false
				this.recordlist[this.itemIndex].status = true
			},
			closeModel(){
				this.showModel = false
			}
		}
	}
</script>

<style>
	.list {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx 0 #ddd;
		padding: 0 30upx 40upx;
	}

	.list-item {
		padding: 24upx 0;
		border-bottom: 1upx solid #eee;
	}

	.msg {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10upx;
	}

	.msg>view {
		width: 33%;
		line-height: 40upx;
	}

	.btns2 {
		display: flex;
		justify-content: flex-end;
		padding: 10upx 0;
	}

	.btns2 button {
		height: 50upx;
		line-height: 50upx;
		width: 180upx;
		font-size: 24upx;
		padding: 0;
	}

	.wait {
		height: 70upx;
		text-align: right;
		font-size: 24upx;
		color: #888;
	}
</style>
