<template>
	<view>
		<view class="container">
			<view class="questions" v-for="(arr,index1) in questions" :key='index1'>
				<view class="questions-con" :class="index2==arr.length-1?'':'border-bottom'" v-for="(item,index2) in arr" :key='index2' @tap="toQuestionDetail">
					<view class="ask">
						<image src="../../static/mine/ask_03.png" mode="widthFix"></image>
						<view class="ask-txt">平时喜欢喝茶叶水,有影响么?</view>
						<view class="ask-status1" v-if="item.status==0">已处理</view>
						<view class="ask-status2" v-if="item.status==1">未处理</view>
					</view>
					<view class="answer">
						<image src="../../static/mine/ask_06.png" mode="widthFix"></image>
						<view class="answer-txt">没有什么影响</view>
						<view class="ask-time">2019-05-15 16:33</view>
					</view>
				</view>	
			</view>
		</view>	
		<bottom-btn :txt="'去提问'" @tap='toFeedback'></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questions: [],
			}
		},
		onLoad() {
			var arr = [
				{status:0},
				{status:1},
				{status:1},
				{status:0},
				{status:0},
				{status:1},
				{status:0},
			]
			this.questions = this.getNewList(arr)
		},
		methods: {
			toFeedback() {
				uni.navigateTo({
					url: '../feedback/feedback'
				})
			},
			getNewList(arr){
				var result = [];
				for(var i=0;i<arr.length;i+=2){
				    result.push(arr.slice(i,i+2));
				}
				return result			
			},
			toQuestionDetail(){
				uni.navigateTo({
					url:'../questionDetail/questionDetail'
				})
			}
		}
	}
</script>

<style>
	.container{
		margin-bottom: 200upx;
	}
	.questions {
		margin: 40upx 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		padding: 10upx 30upx;
	}

	.ask,
	.answer {
		display: flex;
		justify-content: space-between;
		line-height: 40upx;
		padding-left: 50upx;
		position: relative;
	}
	.ask image,.answer image{
		width: 32upx;
		height: 32upx;
		position: absolute;
		top: 4upx;
		left: 0;
	}
	.questions-con{
		padding: 20upx 0;
	}
	.border-bottom{
		border-bottom: 2upx solid #f1f1f1;
	}
	.ask-txt{
		font-weight: 600;
		flex: 1;
		margin-right: 20upx;
	}
	.ask-status1,.ask-time{
		color: #888;
	}
	.ask-time{
		font-size: 26upx;
	}
	.ask-status2{
		color: red;
	}
</style>
