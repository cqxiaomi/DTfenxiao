<template>
	<view>
		<view class="form">
			<view class="item">
				<view class="">*</view>
				<view class="">负责人姓名</view>
				<view class="">
					<input type="text" v-model="name" placeholder="请填写负责人姓名" />
				</view>
			</view>
			<view class="item">
				<view class="">*</view>
				<view class="">负责人性别</view>
				<view class="">
					<label for="" @tap="selectSex(0)">
						<text class="lg text-gray sex" :class="currentIndex==0?'cuIcon-roundcheckfill red':'cuIcon-round'"></text>男
					</label>
					<label for="" @tap="selectSex(1)" style="margin-left: 60upx;">
						<text class="lg text-gray sex" :class="currentIndex==1?'cuIcon-roundcheckfill red':'cuIcon-round'"></text>女
					</label>
				</view>
			</view>
			<view class="item">
				<view class="">*</view>
				<view class="">身份证号</view>
				<view class="">
					<input type="text" v-model="cardId" maxlength="18" placeholder="请填写身份证号" />
				</view>
			</view>
			<view class="item">
				<view class="">*</view>
				<view class="">联系方式</view>
				<view class="">
					<input type="text" v-model="mobile" placeholder="请填写联系方式" />
				</view>
			</view>
			<view class="item">
				<view class="">*</view>
				<view class="">省市区</view>
				<view class="">
					<picker mode="region" @change="chooseAdd">
						<view>{{pickerAddress}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="">*</view>
				<view class="">详细地址</view>
				<view class="">
					<input type="text" v-model="addressDetail" placeholder="请填写店铺详细地址" />
				</view>
			</view>
			<view class="photo">
				<view class="upload">
					<view>请上传营业执照</view>
					<view v-if="images.length!=0" @tap="takePhoto">重新上传</view>
				</view>
				<view class="images" v-if="images.length!=0">
					<view class="img-box" v-for="(item,index) in images" :key='index' :style="'background-image: url('+item+');'">
						<text class="lg text-gray cuIcon-roundclosefill" @tap="delImage(index)"></text>
					</view>
				</view>
				<view class="con" v-else @tap="takePhoto">
					<i class="iconfont iconzhaoxiangji" style="font-size: 54upx;margin-top: 60upx;"></i>
					<view style="font-size: 18upx;letter-spacing: 1upx;">营业执照照片</view>
				</view>
			</view>
		</view>
		<view class="bottom" @tap="toExamine">提交审核</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: -1,
				pickerAddress: '请选择省/市/区',
				images: [],
				name:"",
				cardId:"",
				mobile:"",
				addressDetail:"",
				// name: '夏进宇',
				// cardId: '320621199701268318',
				// mobile: '13376889854',
				// addressDetail: '新中宇维萨公馆',
				pickerAddressArr: []
			}
		},
		methods: {
			//选择性别
			selectSex(index) {
				this.currentIndex = index
			},
			//选择地址
			chooseAdd(e) {
				console.log(e)
				this.pickerAddress = e.detail.value.join(' ')
				this.pickerAddressArr = e.detail.value
			},
			//拍照
			takePhoto() {
				uni.chooseImage({
					count: 1, //默认9
					success: (res) => {
						console.log(res.tempFilePaths);
						this.images = res.tempFilePaths
					}
				});
			},
			//删除上传的照片
			delImage(index) {
				this.images.splice(index, 1)
			},
			//提交审核
			toExamine() {
				if (this.name == '') {
					this.showToast('请填写负责人姓名')
					return
				} else if (this.currentIndex == -1) {
					this.showToast('请选择负责人性别')
					return
				} else if (this.cardId == '') {
					this.showToast('请填写身份证号')
					return
				} else if (this.mobile == '') {
					this.showToast('请填写联系方式')
					return
				} else if (this.pickerAddress == '请选择省/市/区') {
					this.showToast('请选择省/市/区')
					return
				} else if (this.addressDetail == '') {
					this.showToast('请填写详细地址')
					return
				} else if (this.images.length == 0) {
					this.showToast('请上传营业执照')
					return
				}
				uni.showLoading({
					title: '提交申请中'
				})
				this.setheader()
				uni.uploadFile({
					url: this.websiteUrl + '/api/Shop/addShop',
					formData: {
						token: uni.getStorageSync('token'),
						shop_id: uni.getStorageSync('shop_id'),
						name: this.name,
						sex: this.currentIndex == 0 ? '男' : '女',
						idNumber: this.cardId,
						phone: this.mobile,
						area: this.pickerAddressArr.join(''),
						address: this.addressDetail
					},
					filePath: this.images[0],
					name: 'image',
					method: "POST",
					header: this.header,
					success: (res) => {
						uni.hideLoading()
						console.log(JSON.parse(res.data).msg)
						this.showToast(JSON.parse(res.data).msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			}
		}
	}
</script>

<style>
	.form {
		margin: 40upx 30upx 140upx;
		border-radius: 20upx;
		box-shadow: 0 5upx 15upx rgba(0, 0, 0, 0.1);
		padding: 15upx;
	}

	.item {
		display: flex;
		border-bottom: 1upx solid #f5f5f5;
		padding: 20upx 0;
		line-height: 50upx;
		font-size: 30upx;
	}

	.item>view:nth-child(1) {
		color: red;
		margin: 0 10upx;
	}

	.item>view:nth-child(2) {
		width: 180upx;
	}

	.item>view:nth-child(3) {
		flex: 1;
	}

	.item input {
		height: 100%;
	}

	.photo {
		padding: 20upx;
	}

	.photo .con {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
		text-align: center;
		margin: 20upx auto;
		border: 1upx solid #AAAAAA;
		color: #aaa;
	}

	.bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		background-color: #F23027;
		font-size: 28upx;
		text-align: center;
		color: #fff;
	}

	.sex {
		font-size: 36upx;
		padding-right: 5upx;
	}

	.images {
		display: flex;
		justify-content: space-between;
		margin: 40upx 0 20upx;
		flex-wrap: wrap;
	}

	.images>view {
		width: 200upx;
		height: 200upx;
		border-radius: 10upx;
	}

	.img-box {
		position: relative;
		box-shadow: 0 5upx 10upx rgba(0, 0, 0, 0.1);
		background-size: cover;
	}

	.img-box text {
		font-size: 36upx;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}

	.upload {
		display: flex;
		justify-content: space-between;
		color: #666;
		font-size: 30upx;
	}
</style>
