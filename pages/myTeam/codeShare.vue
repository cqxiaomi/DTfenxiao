<template>
	<view>
		<view class="box">
			<view class="pic">
				<image :src="personMsg.avatarUrl" mode="widthFix"></image>
			</view>
			<view class="name" style="text-align: center;margin-bottom: 25upx;font-size: 36upx;font-weight: 600;">{{personMsg.nickName}}</view>
			<!-- <image style="width: 70%;" :src="'data:image/png;base64,'+QRcodeImage" mode="widthFix"></image> -->
			<image style="width: 70%;" :src="QRcodeImage" mode="widthFix"></image>
			<button class="cu-btn bg-red round shadow-blur" style="background-color:#F23027;width: 50%;margin: 20upx 0;height: 80upx;"
			 @tap="saveImage">保存二维码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personMsg: null,
				QRcodeImage: null
			}
		},
		onLoad(options) {
			this.personMsg = this.$common.wxMsg
			this.getQRcodeImage()
		},
		methods: {
			saveImage() {
				uni.downloadFile({
					url: this.QRcodeImage, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.tempFilePath)
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									console.log('save success');
								},
								fail: (err) => {
									console.log(err)
								}
							});
						}
					}
				});
			},
			getQRcodeImage() {
				// this.setheader()
				// uni.request({
				// 	url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5da903400f1acdfb&secret=e8186f6018f0ccdb9d3288a66c6dcc5f",
				// 	success: (res) => {
				// 		console.log(res.data.access_token)
				// 		let access_token = res.data.access_token
				// 		uni.request({
				// 			url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + access_token,
				// 			data:{
				// 				page: "pages/index/index",
				// 				scene: uni.getStorageSync("user_id") + '_' + uni.getStorageSync('shop_id')
				// 			},
				// 			header: this.header,
				// 			method: 'POST',
				// 			responseType: 'arraybuffer',
				// 			success: (res) => {
				// 				console.log(uni.arrayBufferToBase64(res.data))
				// 				// console.log(res)
				// 			}
				// 		})
				// 	}
				// })
				this.setheader()
				uni.request({
					url: this.websiteUrl + "/api/User/wxacode",
					data: {
						user_id: uni.getStorageSync('user_id'),
						shop_id: uni.getStorageSync('shop_id'),
						scene:uni.getStorageSync('user_id')+"_"+uni.getStorageSync('shop_id')
					},
					header: this.header,
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							this.QRcodeImage = res.data.data
							return
						}
						this.showToast(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style>
	.pic {
		width: 260upx;
		height: 260upx;
		background-color: #000;
		margin: 100upx auto 20upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.box {
		position: fixed;
		width: 690upx;
		top: 40upx;
		left: 30upx;
		bottom: 40upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.2);
		text-align: center;
	}
</style>
