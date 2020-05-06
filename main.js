import Vue from 'vue'
import App from './App'
import common from './common/common.js'
import goodsList from './components/goodsList.vue'
import orderGoodsList from './components/orderGoodsList.vue'
import bottomBtn from './components/bottomBtn.vue'
import endTip from './components/endTip.vue'

//公共组件
Vue.component('goods-list',goodsList)
Vue.component('order-goods-list',orderGoodsList)
Vue.component('end-tip',endTip)
Vue.component('bottom-btn',bottomBtn)

Vue.config.productionTip = false

//全局变量
Vue.prototype.websiteUrl = 'https://erp.dtyp.net/index.php'
// Vue.prototype.websiteUrl = 'https://new.dtyp.net/index.php'
Vue.prototype.imgUrl = 'https://erp.dtyp.net'
Vue.prototype.$common = common;
Vue.prototype.mapKey = '7IMBZ-BZVLQ-FIW5G-G6NIB-QTD6F-GYFK3';//腾讯地图key


//全局方法
//设置请求头
Vue.prototype.setheader = function(){
	let cookie = uni.getStorageSync('cookieKey')//取出Cookie
	let header = { 'Content-Type': 'application/json'}
	if (cookie) {
	     header.Cookie = cookie;
	}
	Vue.prototype.header = header
}
//toast弹窗
Vue.prototype.showToast = function(msg, time) {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: arguments[1]||2000
	})
}
//session过期重新登录
Vue.prototype.reLogin = function(){
	uni.navigateTo({
		url:'../wxLogin/wxLogin?type=reLogin',
		success: () => {
			this.showToast('登陆过期，请重新登录')
		}
	})
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
