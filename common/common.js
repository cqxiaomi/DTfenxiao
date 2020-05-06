export default {
	//全局公共参数
	//购物车商品数量
	cartCount:0,
	mobileMsg:null,
	//是否显示修改密码提示框
	showTip:false,
	isLogin:false,
    wxMsg:null,
	message:0,
	defaultCity:'北京市',
	otherProgramUserid:null,
	setCartCount(data){
		this.cartCount = data
	},
	setIsLogin(data){
		this.isLogin = data
	},
	setShowTip(data){
		this.showTip = data
	},
	setMobile(data){
		this.mobileMsg = data
	},
    setWxMsg(data){
        this.wxMsg = data 
    },
	setMessage(data){
		this.message = message
	},
	setDefaultCity(data){
		this.defaultCity = defaultCity
	},
	setOtherProgramUserid(data){
		this.otherProgramUserid = otherProgramUserid
	}
}