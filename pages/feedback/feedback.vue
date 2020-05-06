<template>
	<view>
		<view class="feedback">
			<textarea class="txt" v-model="feedbackTxt" placeholder="请详细描述你的建议,这将帮助我们持续改进~" maxlength=-1 placeholder-class="font1" />
			<view class="txtnum">{{feedbackTxt.length}}/500</view>
			<input class="tel" type="text" value="" placeholder="请填写手机号，方便我们与你联系" placeholder-class="font1"/>
			<view class="">
				<view style="margin: 20upx 0 40upx;display: flex;justify-content: space-between;">
					<view style="color: #aaa;">上传图片(最多四张)</view>
					<view style="color: #888;" v-if="images.length!=0" @tap="takePhoto">重新上传</view>
				</view>
				<view class="add">
					<view class="image-box" v-if="images.length!=0">
						<view class="pic" v-for="(item,index) in images" :key="index" :style="'background-image: url('+item+');'">
							<text class="lg text-gray cuIcon-roundclosefill del-icon" @tap="delImage(index)"></text>
						</view>
						<view v-if="images.length<3"></view>
						<view v-if="images.length<4"></view>
					</view>
					<view class="add-box" v-else @tap="takePhoto">
						<text class="lg text-gray cuIcon-add add-icon"></text>
					</view>
				</view>	
			</view>
		</view>
		<bottom-btn :txt="'提交'" @tap="toAddAddress"></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbackTxt:'',
				images:[],
			}
		},
		methods: {
			//拍照
			takePhoto() {
				uni.chooseImage({
					count: 4, //默认9
					success: (res) => {
						console.log(res.tempFilePaths);
						this.images = res.tempFilePaths
					}
				});
			},
			//删除上传的照片
			delImage(index){
				this.images.splice(index,1)
			}
		}
	}
</script>

<style>
	.top {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 100;
		min-height: 88upx;
	}
	.feedback{
		position:fixed;
		width: 690upx;
		top: 40upx;
		bottom: 140upx;
		left: 30upx;
		border-radius: 20upx;	
		box-shadow: 0 5upx 15upx rgba(0,0,0,0.1);
		padding: 30upx;
		padding-bottom: 50upx;
	}
	.txt{
		width: 100%;
		height: 300upx;
		resize: none;
	}
	.txtnum{
		text-align: right;
		color: #aaa;
		line-height: 50upx;
		font-size: 24upx;
	}
	.tel{
		height: 70upx;
		border-bottom: 1upx solid #f1f1f1;
		border-top: 1upx solid #f1f1f1;
	}
	.image-box{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.image-box>view{
		width: 142upx;
		height: 142upx;
		border-radius: 20upx;
	}
	.pic{
		box-shadow: 0 5upx 10upx rgba(0,0,0,0.1);
		background-size: cover;
		position: relative;
	}
	.add-box{
		width: 142upx;
		height: 142upx;
		line-height: 142upx;
		text-align: center;
		border-radius: 20upx;
		box-shadow: 0 5upx 10upx rgba(0,0,0,0.1);
	}
	.del-icon{
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%,-50%);
		font-size: 36upx;
	}
	
	.add-icon{
		font-size: 80upx;
		color: #ccc !important;
	}
	.font1{
		color: #aaa;
	}
</style>
