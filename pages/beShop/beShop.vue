<template>
	<view>
		<view class="box">
			<view class="box-title">联系信息</view>
			<!-- <view class="box-item">
				<view class="item-l">管理员姓名</view>
				<view class="item-r">
					<input type="text" v-model="super_name" value="" />
				</view>
			</view> -->
			<view class="box-item">
				<view class="item-l">手机号</view>
				<view class="item-r">
					<input type="text" v-model="phone" value="" />
				</view>
			</view>
			<view class="box-item">
				<view class="item-l">常用邮箱</view>
				<view class="item-r">
					<input type="text" v-model="email" value="" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">经营信息</view>
			<view class="box-item">
				<view class="item-l">商户简称</view>
				<view class="item-r">
					<input type="text" v-model="stroe_nickename" value="" />
				</view>
			</view>
			<view class="box-item">
				<view class="item-l">客服电话</view>
				<view class="item-r">
					<input type="text" v-model="tel" value="" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">商户信息<text style="font-size: 22upx;color: red;font-weight: normal;">（上传图片时尽量保证图片清晰）</text></view>
			<view class="box-item box-pic-item">
				<view class="item-l">营业执照照片</view>
				<view class="upload-pic no-border" v-if="hasload1" :style="'background-image: url('+license+');'"></view>
				<view class="upload-pic" v-else @tap="upLoadPic(1)">
					<text class="lg text-gray cuIcon-picfill" style="font-size: 48upx;"></text>
				</view>
				<view class="reUpload" v-if="hasload1" @tap="upLoadPic(1)">重新上传</view>
			</view>
			<view v-if="hasload1">
				<view class="box-item">
					<view class="item-l">营业执照注册号</view>
					<view class="item-r">
						<input type="text" v-model="license_no" value="" />
					</view>
				</view>
				<!-- <view class="box-item">
					<view class="item-l">营业期限</view>
					<view class="item-r">
						<input type="text" v-model="license_time" value="" />
					</view>
				</view> -->
				<view class="box-item">
					<view class="item-l">经营范围</view>
					<view class="item-r">
						<textarea class="textarea" value="" auto-height v-model="license_space" placeholder="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">商户名称</view>
					<view class="item-r">
						<input type="text" v-model="stroe_name" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">法人姓名</view>
					<view class="item-r">
						<input type="text" v-model="legal_person" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">门店地址</view>
					<view class="item-r">
						<textarea class="textarea" value="" auto-height v-model="stroe_address" placeholder="" />
					</view>
				</view>
				<!-- <view class="box-item">
					<view class="item-l">注册地址</view>
					<view class="item-r">
						<input type="text" v-model="register_address" value="" />
					</view>
				</view> -->
			</view>
			

		</view>
		<view class="box">
			<view class="box-title">企业法人<text style="font-size: 22upx;color: red;font-weight: normal;">（上传图片时尽量保证图片清晰）</text></view>
			<view class="box-item box-pic-item">
				<view class="item-l">身份证人像面</view>
				<view class="upload-pic no-border" v-if="hasload2" :style="'background-image: url('+idCard_positive+');'"></view>
				<view class="upload-pic" v-else @tap="upLoadPic(2)">
					<text class="lg text-gray cuIcon-picfill" style="font-size: 48upx;"></text>
				</view>
				<view class="reUpload" v-if="hasload2" @tap="upLoadPic(2)">重新上传</view>
			</view>
			<view v-if="hasload2">
				<view class="box-item">
					<view class="item-l">证件号码</view>
					<view class="item-r">
						<input type="text" v-model="document_no" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">证件持有人姓名</view>
					<view class="item-r">
						<input type="text" v-model="document_name" value="" />
					</view>
				</view>
			</view>
			<view class="box-item box-pic-item">
				<view class="item-l">身份证国徽面</view>
				<view class="upload-pic no-border" v-if="hasload3" :style="'background-image: url('+idCard_negative+');'"></view>
				<view class="upload-pic" v-else @tap="upLoadPic(3)">
					<text class="lg text-gray cuIcon-picfill" style="font-size: 48upx;"></text>
				</view>
				<view class="reUpload" v-if="hasload3" @tap="upLoadPic(3)">重新上传</view>
			</view>
			<view v-if="hasload3">
				<view class="box-item">
					<view class="item-l">证件有效期(起)</view>
					
					<view class="item-r">
						<picker class="picker" mode="date" @change="chooseStartTime">
							<view>{{document_time_1?document_time_1:'请选择开始时间'}}</view>
						</picker>
					</view>	
				</view>
				<view class="box-item">
					<view class="item-l">证件有效期(止)</view>
					<view class="item-r">
						<picker class="picker" mode="date" @change="chooseEndTime">
							<view>{{document_time_2?document_time_2:'请选择结束时间'}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">银行卡信息<text style="font-size: 22upx;color: red;font-weight: normal;">（上传图片时尽量保证图片清晰）</text></view>
			<view class="box-item box-pic-item">
				<view class="item-l">银行卡照片</view>
				<view class="upload-pic no-border" v-if="hasload4" :style="'background-image: url('+bandCard+');'"></view>
				<view class="upload-pic" v-else @tap="upLoadPic(4)">
					<text class="lg text-gray cuIcon-picfill" style="font-size: 48upx;"></text>
				</view>
				<view class="reUpload" v-if="hasload4" @tap="upLoadPic(4)">重新上传</view>
			</view>
			<view v-if="hasload4">
				<view class="box-item">
					<view class="item-l">开户人姓名</view>
					<view class="item-r">
						<input type="text" v-model="account_name" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">开户银行</view>
					<view class="item-r">
						<input type="text" v-model="account_bank" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">开户银行城市</view>
					<view class="item-r">
						<picker class="picker" mode="region"  @change="chooseBankCity">
							<view>{{bankCity}}</view>
						</picker>
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">开户支行</view>
					<view class="item-r">
						<input type="text" v-model="account_site" value="" />
					</view>
				</view>
				<view class="box-item">
					<view class="item-l">银行账号</view>
					<view class="item-r">
						<input type="text" v-model="account_no" value="" />
					</view>
				</view>
			</view>
		</view>
		<button class="cu-btn round shadow-blur" style="height: 80upx;width: 690upx;margin:0 30upx 40upx;background-color: #55AFFD;color: #FFFFFF;"
		 @tap="sureSubmit">提交开店申请</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				license: null, 
				idCard_positive: null, 
				idCard_negative: null, 
				bankCity:"请选择开户银行城市",
				bandCard: null, 
				hasload1: false,
				hasload2: false,
				hasload3: false,
				hasload4: false,
				// super_name: null,
				phone: null,
				email: null,
				stroe_nickename: null, //商户简称
				// store_type: null, //经营类目
				// store_scene: null, //售卖商品场景
				tel: null, //客服电话
				// note: null, //补充材料
				license_pic: null,//营业执照
				license_no:null,//营业执照注册号
				license_space:null,//经营范围
				stroe_name:null,//商户名称
				legal_person:null,//法人姓名
				stroe_address: null, //门店地址
				document_pic_1: null,//身份证人像面
				document_pic_2: null,//身份证国徽面
				document_no:null,//证件号码
				document_name:null,//证件持有人姓名
				document_time_1:null,//证件有效期（起）
				document_time_2:null,//证件有效期（止）
				account_img:null,//银行卡照片
				account_name: null,//开户人姓名
				account_bank:null,//开户银行
				account_city:null,//开户银行城市
				account_site: null,//开户支行
				account_no:null,//银行账号
			}
		},
		onShow() {
			if(!uni.getStorageSync('token')){
				uni.navigateTo({
					url: "../wxLogin/wxLogin"
				})
			}
		},
		methods: {
			chooseBankCity(e){
				console.log(e.detail.value)
				let bankCity = e.detail.value
				this.bankCity = e.detail.value.join('>')
				this.account_city = bankCity[1]+','+bankCity[2]
			},
			sureSubmit() {
				// if (!this.super_name) {
				// 	this.showToast('请填写管理员姓名')
				// 	return
				// }
				if (!this.phone) {
					this.showToast('请填写手机号')
					return
				}
				if (!this.email) {
					this.showToast('请填写常用邮箱')
					return
				}
				if (!this.stroe_nickename) {
					this.showToast('请填写商户简称')
					return
				}
				if (!this.tel) {
					this.showToast('请填写客服电话')
					return
				}
				if (!this.license_pic) {
					this.showToast('请上传营业执照照片')
					return
				}
				if (!this.license_no) {
					this.showToast('请填写营业执照注册号')
					return
				}
				if (!this.license_space) {
					this.showToast('请填写经营范围')
					return
				}
				if (!this.stroe_name) {
					this.showToast('请填写商户名称')
					return
				}
				if (!this.legal_person) {
					this.showToast('请填写法人姓名')
					return
				}
				if (!this.stroe_address) {
					this.showToast('请填写门店地址')
					return
				}
				if (!this.stroe_address) {
					this.showToast('请填写门店地址')
					return
				}
				if (!this.document_pic_1) {
					this.showToast('请上传身份证人像面照片')
					return
				}
				if (!this.document_no) {
					this.showToast('请填写证件号码')
					return
				}
				if (!this.document_name) {
					this.showToast('请填写证件持有人姓名')
					return
				}
				if (!this.document_pic_2) {
					this.showToast('请上传身份证国徽面照片')
					return
				}
				if (!this.document_time_1) {
					this.showToast('请填写证件有效期开始时间')
					return
				}
				if (!this.document_time_2) {
					this.showToast('请填写证件有效期结束时间')
					return
				}
				if (!this.account_img) {
					this.showToast('请上传银行卡照片')
					return
				}
				if (!this.account_name) {
					this.showToast('请填写开户人姓名')
					return
				}
				if (!this.account_bank) {
					this.showToast('请填写开户银行')
					return
				}
				if (!this.account_city) {
					this.showToast('请选择开户银行城市')
					return
				}
				if (!this.account_site) {
					this.showToast('请填写开户支行')
					return
				}
				if (!this.account_no) {
					this.showToast('请填写银行账号')
					return
				}
				this.setheader()
				uni.request({
					url: this.websiteUrl + '/store/publics/makeShop',
					data: {
						user_id: uni.getStorageSync('user_id'),
						phone: this.phone,//手机号
						email: this.email,//常用邮箱
						stroe_nickename: this.stroe_nickename, //商户简称
						// store_type: this.store_type, //经营类目
						// store_scene: this.store_scene, //售卖商品场景
						tel: this.tel, //客服电话
						// note: this.note, //补充材料
						license_pic: this.license_pic,//营业执照
						license_no:this.license_no,//营业执照注册号
						license_space:this.license_space,//经营范围
						stroe_name:this.stroe_name,//商户名称
						legal_person:this.legal_person,//法人姓名
						stroe_address: this.stroe_address, //门店地址
						document_pic_1: this.document_pic_1,//身份证人像面
						document_pic_2: this.document_pic_2,//身份证国徽面
						document_no:this.document_no,//证件号码
						document_name:this.document_name,//证件持有人姓名
						document_time_1:this.document_time_1,//证件有效期（起）
						document_time_2:this.document_time_2,//证件有效期（止）
						account_img:this.account_img,//银行卡照片
						account_name: this.account_name,//开户人姓名
						account_bank:this.account_bank,//开户银行
						account_city:this.account_city,//开户银行城市
						account_site: this.account_site,//开户支行
						account_no:this.account_no,//银行账号
					},
					header: this.header,
					method: 'POST',
					success: (res) => {
						console.log(res.data)
						if (res.data.status == 0) {
							uni.redirectTo({
								url: "./steps"
							})
							return
						}
						this.showToast(res.data.msg)
					}
				})
			},
			changeCardType(e) {
				console.log(e.target.value)
				this.pickerType = this.cardTypes[e.target.value]
			},
			//选择经营时间
			chooseLicenseStartTime(e) {
				this.license_start_time = e.target.value
			},
			chooseLicenseEndTime(e) {
				this.license_end_time = e.target.value
			},
			//选择身份证有效时间
			chooseStartTime(e) {
				this.document_time_1 = e.target.value
			},
			chooseEndTime(e) {
				this.document_time_2 = e.target.value
			},
			upLoadPic(type) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType:'compressed',
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						let picUrl = res.tempFilePaths[0]
						if (type == 1) { //上传营业执照
							this.hasload1 = false
							this.license = picUrl
						} else if (type == 2) { //上传身份证人像面
							this.hasload2 = false
							this.idCard_positive = picUrl
						} else if (type == 3) { //上传身份证国徽面
							this.hasload3 = false
							this.idCard_negative = picUrl
						} else if (type == 4) { //上传银行卡照片
							this.hasload4 = false
							this.bandCard = picUrl
							this.account_name = null
							this.account_city = null
							this.account_site = null
							this.bankCity = "请选择开户银行城市"
						}
						uni.showLoading({
							title: "上传图片中"
						})
						this.sureUpload(type, picUrl)
					}
				});
			},
			//上传图片
			sureUpload(type, url) {
				this.setheader()
				uni.uploadFile({
					url: this.websiteUrl + '/store/publics/makeShopImg',
					name: 'img',
					filePath: url,
					formData: {
						user_id: uni.getStorageSync('user_id'),
						type: type
					},
					header: this.header,
					success: (res) => {
						uni.hideLoading()
						console.log(JSON.parse(res.data))
						let result = JSON.parse(res.data)
						let info = result.info
						if (result.status == 0) {
							if (type == 1) {
								this.license_pic = result.data
								this.license_no = info.words_result['社会信用代码'].words
								this.license_space = info.words_result['经营范围'].words
								this.stroe_name = info.words_result['单位名称'].words
								this.legal_person = info.words_result['法人'].words
								this.stroe_address = info.words_result['地址'].words
								this.showToast('请仔细核对商户信息')
								this.hasload1 = true
							} else if (type == 2) {
								this.document_pic_1 = result.data
								this.document_no = info.words_result['公民身份号码'].words
								this.document_name = info.words_result['姓名'].words
								this.showToast('请仔细核对身份证信息')
								this.hasload2 = true
							} else if (type == 3) {
								this.document_pic_2 = result.data
								this.document_time_1 = this.handelTime(info.words_result['签发日期'].words) 
								this.document_time_2 = this.handelTime(info.words_result['失效日期'].words)
								this.showToast('请仔细核对身份证有效期')
								this.hasload3 = true
							} else if (type == 4) {
								this.account_img = result.data
								this.account_bank = info.result.bank_name
								this.account_no = info.result.bank_card_number
								this.showToast('请仔细核对银行卡信息')
								this.hasload4 = true
							}
							return
						}
						this.showToast(result.msg)
					},
					fail: () => {
						this.showToast('系统繁忙，请稍后重试！')
					}
				})
			},
			handelTime(time){
				if(!time){
					return
				}
				let year = time.slice(0,4)
				let month = time.slice(4,6)
				let day = time.slice(6,8)
				return year +'-'+ month +'-'+ day
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.box {
		margin: 30upx;
		border-radius: 10upx;
		box-shadow: 0 5upx 20upx 3upx #ddd;
		background-color: #fff;
		padding: 20upx;
	}

	.box-title {
		font-weight: 800;
		padding-bottom: 20upx;
		display: flex;
		line-height: 40upx;
		font-size: 30upx;
	}

	.box-item {
		display: flex;
		line-height: 50upx;
		padding: 20upx 0;
	}

	.box-item input {
		height: 50upx;
		padding: 0 10upx;
		border-bottom: 1upx solid #ddd;
	}
	.picker{
		padding: 0 10upx;
		border-bottom: 1upx solid #ddd;
	}
	.textarea{
		width: 100%;
		padding:0 10upx;
		border-bottom: 1upx solid #ddd;
	}

	.box-item .item-l {
		width: 220upx;
	}

	.box-item .item-r {
		flex: 1;
		overflow: hidden;
	}

	.upload-pic {
		flex: 1;
		/* width: 240upx; */
		height: 200upx;
		text-align: center;
		line-height: 200upx;
		border: 1upx solid #ddd;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 10upx;
		overflow: hidden;
	}
	.no-border{
		border: 0 !important;
	}

	.box-pic-item {
		line-height: 200upx;
	}

	.reUpload {
		color: #55AFFD;
		margin-left: 20upx;
	}
</style>
