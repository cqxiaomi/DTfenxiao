<template>
	<view>
		<view class="question">
			<view class="ask">
				<image class="ask-icon" src="../../static/mine/ask_03.png" mode="widthFix"></image>
				<view class="ask-top">
					<view class="ask-title">平时喜欢喝茶叶水,有影响吗?哈哈啊哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈</view>
					<view class="ask-status1">已处理</view>
					<!-- <view class="ask-status1" v-if="status==0">已处理</view>
					<view class="ask-status2" v-if="status==1">未处理</view> -->
				</view>
				<view class="ask-time">2019-08-21 17:22</view>
			</view>
			<view class="answer-con">
				<image class="answer-icon" src="../../static/mine/ask_06.png" mode="widthFix"></image>
				<view class="answer" :class="index==answers.length-1?'no-border':''" v-for="(item,index) in answers" :key='index'>
					<view class="answer-avator">
						<image src="../../static/mine/avatar.jpg" mode="widthFix"></image>
					</view>
					<view class="answer-right">
						<view class="answer-right-top">
							<view class="answer-name">卖女孩的小火柴</view>
							<view class="answer-time">2019-08-22 22:36</view>
						</view>
						<view class="answer-txt">还好,不会有什么影响</view>
					</view>
				</view>
			</view>
		</view>
		<view class="input-box">
			<input type="text" value="" placeholder="请输入内容" placeholder-style="color:#aaa" />
			<button class="cu-btn bg-red round shadow-blur" style="background-color: red;">回复</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				answers: [1, 2, 3, 4, 4, 5, 5]
			}
		},
		methods: {

		}
	}
</script>

<style>
	image {
		width: 100%;
		display: block;
	}

	.question {
		margin: 40upx 30upx 140upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		padding: 10upx 30upx;
	}

	.ask {
		padding: 20upx 0 20upx 50upx;
		border-bottom: 1upx solid #f1f1f1;
		position: relative;
	}
	.answer-con{
		padding-left: 50upx;
		position: relative;
	}
	.ask-icon,.answer-icon{
		width: 32upx;
		position: absolute;
		top: 32upx;
		left: 0;
	}

	.ask-top {
		display: flex;
		justify-content: space-between;
		padding: 10upx 0;
		line-height: 36upx;
	}

	.ask-title {
		font-weight: 600;
		flex: 1;
		margin-right: 20upx;
	}

	.ask-status1,
	.ask-time,
	.answer-time {
		color: #888;
	}

	.ask-time,
	.answer-time {
		font-size: 26upx;
	}

	.ask-status2 {
		color: red;
	}

	.answer-avator {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-right: 20upx;
		overflow: hidden;
	}

	.answer {
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #f1f1f1;
	}

	.answer-right {
		flex: 1;
	}

	.answer-right-top {
		line-height: 40upx;
	}

	.answer-txt {
		padding-top: 20upx;
		font-size: 26upx;
	}

	.no-border {
		border: 0;
	}

	.input-box {
		position: fixed;
		bottom: 0;
		height: 100upx;
		width: 100%;
		background-color: #fff;
		z-index: 100;
		padding: 15upx 30upx;
		border-top: 1upx solid #f1f1f1;
		display: flex;
		justify-content: space-between;
	}

	.input-box input {
		height: 100%;
		background-color: #f5f5f5;
		flex: 1;
		margin-right: 20upx;
		border-radius: 20upx;
		padding: 0 20upx;
	}

	.input-box button {
		width: 180upx;
		padding: 0;
	}
</style>
