<template>
	<view>
		<view class="about">
			<view class="title">{{title}}</view>
			<view class="con">
				<scroll-view scroll-y="true" class="scroll">
					<view class="txt"></view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad(options) {
			this.title = options.title
		},
		methods: {

		}
	}
</script>

<style>
	page {
		font-size: 30upx;
	}

	.about {
		position: fixed;
		width: 690upx;
		top: 40upx;
		bottom: 40upx;
		left: 30upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		padding: 0 30upx;
	}

	.title,
	.bottom {
		text-align: center;
	}

	.title {
		margin-top: 40upx;
		font-size: 40upx;
		font-weight: 600;
		letter-spacing: 1upx;
		/* text-shadow: 3upx 3upx 2upx #333; */
	}

	.bottom {
		position: absolute;
		width: 690upx;
		left: 0;
		bottom: 30upx;
		font-size: 24upx;
		color: #aaa;
	}

	.company {
		margin: 20upx 0;
	}

	.txt {
		line-height: 40upx;
		text-align: justify;
	}

	.scroll {
		position: absolute;
		width: 570upx;
		left: 60upx;
		bottom: 60upx;
		top: 120upx;
	}
</style>
