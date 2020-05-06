<script>
	import Vue from 'vue'
	export default {
		onLoad(options) {
			console.log(options)
		},
		onLaunch(options) {
			console.log(options)
		},
		onShow: function() {
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
				}
			})	
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/myicon.css";

	page {
		background-color: #fff;
	}

	.red {
		color: red !important;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.clear {
		overflow: hidden;
	}

	.phone-box {
		padding: 60upx 30upx 30upx;
		width: 80%;
		position: relative;
	}

	.btns {
		display: flex;
		justify-content: space-around;
	}

	.btns button {
		width: 40%;
		background-color: red;
	}

	.close {
		position: absolute;
		top: 12upx;
		right: 12upx;
		font-size: 36upx;
	}
</style>
