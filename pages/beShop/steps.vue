<template>
	<view class="">
		
		<view class="bg-white padding">
			<view style="padding: 0 60upx 20upx;line-height: 50upx;">
				<view>您的开店申请已提交，审核大概需要3-5个工作日，请留意短信提醒。</view>
			</view>
			<view class="cu-steps">
				<view class="cu-item" :class="type>=0?'text-blue':''">
					<text class="num" :data-index="1"></text>提交资料
				</view>
				<view class="cu-item" :class="type>=1?'text-blue':''">
					<text class="num" :data-index="2"></text>资料审核中
				</view>
				<view class="cu-item" :class="type>=2?'text-blue':''">
					<text class="num" :data-index="3"></text>申请通过
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				type:0
			}
		},
		onLoad(options) {
			this.type = options.status
		},
		methods:{
			
		}
	}
</script>

<style>
	.text-blue{
		color: #55AFFD;
	}
</style>
