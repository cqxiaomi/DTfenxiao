(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/indexPage/indexPage"],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/*!*****************************************************************************************!*\
  !*** D:/smallRoutineProjects/shop_erp/main.js?{"page":"pages%2FindexPage%2FindexPage"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _indexPage = _interopRequireDefault(__webpack_require__(/*! ./pages/indexPage/indexPage.vue */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_indexPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),
/* 17 */
/*!**********************************************************************!*\
  !*** D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexPage.vue?vue&type=template&id=26c8c8e6& */ 18);
/* harmony import */ var _indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexPage.vue?vue&type=script&lang=js& */ 20);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexPage.vue?vue&type=style&index=0&lang=css& */ 22);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 18 */
/*!*****************************************************************************************************!*\
  !*** D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=template&id=26c8c8e6& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./indexPage.vue?vue&type=template&id=26c8c8e6& */ 19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_template_id_26c8c8e6___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 19 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=template&id=26c8c8e6& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 20 */
/*!***********************************************************************************************!*\
  !*** D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./indexPage.vue?vue&type=script&lang=js& */ 21);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 21 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      TabCur: -1,
      scrollLeft: 0,
      swiperList: null,
      tabs: null,
      subTabs: [],
      localCity: '北京市',
      goods: null,
      cardCur: 0,
      subCurrent: 0,
      scrollTop: 0,
      coupons: [{
        money: 10,
        condition: 100 },
      {
        money: 5,
        condition: 50 },
      {
        money: 10,
        condition: 100 },
      {
        money: 2,
        condition: 10 },
      {
        money: 5,
        condition: 100 },
      {
        money: 20,
        condition: 300 },
      {
        money: 5,
        condition: 50 },
      {
        money: 2,
        condition: 10 }],

      coupon_month: [],
      coupon_day: [],
      subTabsSelectIndex: -1,
      page: 1,
      stopLoad: false };

  },
  onLoad: function onLoad(options) {
    var _this = this;
    console.log(options);
  },
  onShow: function onShow() {var _this2 = this;
    //获取导航列表
    this.getTabs();
    //获取优品券列表
    // this.getCoupons()
    //获取轮播广告图
    this.getAd();
    this.stopLoad = false;
    this.scrollTop = 0;
    this.page = 1;
    if (uni.getStorageSync('localCity')) {
      this.localCity = uni.getStorageSync('localCity');
      this.getList();
    } else {
      uni.getLocation({
        type: 'wgs84',
        success: function success(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log('当前位置的经度：' + longitude + ',当前位置的纬度：' + latitude);
          console.log(_this2.mapKey);
          var mapKey = _this2.mapKey;
          uni.request({
            url: "https://apis.map.qq.com/ws/geocoder/v1/?location=".concat(latitude, ",").concat(longitude, "&key=").concat(mapKey),
            success: function success(res) {
              console.log(res.data.result.ad_info.city);
              _this2.localCity = res.data.result.ad_info.city;
              uni.setStorageSync('localCity', _this2.localCity);
              _this2.getList();
            } });

        },
        fail: function fail(err) {
          console.log(err);
          uni.navigateTo({
            url: "../location/location" });

        } });

    }

  },
  methods: {
    //领取优品券
    receiveCoupon: function receiveCoupon(id) {var _this3 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/coupon/getCoupon',
        data: {
          token: uni.getStorageSync('token'),
          id: id },

        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            uni.showToast({
              icon: "success",
              title: "领取成功" });

            _this3.getCoupons();
            return;
          }
          _this3.showToast(res.data.msg);
        } });

    },
    toSearch: function toSearch() {
      uni.navigateTo({
        url: "../search/search" });

    },
    toClassifyPage: function toClassifyPage(i) {
      uni.setStorageSync('classify', this.tabs[i]);
      uni.navigateTo({
        url: "../classifyPage/classifyPage" });

    },
    //获取优品券列表
    // getCoupons() {
    // 	this.setheader()
    // 	uni.request({
    // 		url: this.websiteUrl + '/api/Coupon/indexCouponList',
    // 		data: {
    // 			token: uni.getStorageSync('token')
    // 		},
    // 		header: this.header,
    // 		success: (res) => {
    // 			console.log(res.data)
    // 			if (res.data.status == 0) {
    // 				this.coupon_month = res.data.data.coupon_month
    // 				this.coupon_day = res.data.data.coupon_day
    // 				this.coupons.push(...this.coupon_month)
    // 				this.coupons.push(...this.coupon_day)
    // 				console.log(this.coupons)
    // 				return
    // 			}
    // 			this.showToast(res.data.msg)
    // 		}
    // 	})
    // },
    getCoupons: function getCoupons() {var _this4 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/index/indexCouponList',
        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            _this4.coupons = res.data.data;
            console.log(_this4.coupons);
            return;
          }
          _this4.showToast(res.data.msg);
        } });

    },
    myScroll: function myScroll(e) {
      // console.log(e.detail.scrollTop)
      this.scrollTop = 1;
    },
    //跳转轮播详情页面
    toDetail: function toDetail(url) {
      console.log(url);
      uni.navigateTo({
        url: url });

    },

    checkMakeShop: function checkMakeShop(url) {var _this5 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/store/publics/selectShop',
        data: {
          user_id: uni.getStorageSync('user_id') },

        header: this.header,
        method: 'POST',
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            if (res.data.data) {
              uni.navigateTo({
                url: "../beShop/steps?status=" + res.data.data.status });

            } else {
              uni.navigateTo({
                url: url });

            }
            return;
          }
          _this5.showToast(res.data.msg);
        } });

    },
    getPoints: function getPoints(url) {var _this6 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/userCenter/getScore',
        data: {
          token: uni.getStorageSync('token') },

        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            _this6.checkMakeShop(url);
            return;
          }
          if (res.data.status == 1) {
            uni.navigateTo({
              url: "../wxLogin/wxLogin" });

            return;
          }
          _this6.showToast(res.data.msg);
        } });

    },
    //获取广告轮播图
    getAd: function getAd() {var _this7 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/Ad/index',
        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            _this7.swiperList = res.data.data;
            return;
          }
          _this7.showToast(res.data.msg);
        } });

    },
    cardSwiper: function cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    toGoodsDetail: function toGoodsDetail(shop_id, goods_id) {
      uni.navigateTo({
        url: "../goodsDetail/goodsDetail?id=" + goods_id + "&shop_id=" + shop_id });

    },
    //点击一级分类标题
    tabSelect: function tabSelect(e) {
      this.scrollTop = 0;
      this.stopLoad = false;
      this.TabCur = e.currentTarget.dataset.index;
      this.page = 1;
      console.log(this.TabCur);
      if (this.TabCur == -1) {
        this.subTabs = [];
      } else {
        this.subTabs = this.tabs[this.TabCur].category;
      }
      console.log(this.subTabs);
      this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
      this.subTabsSelectIndex = -1;
    },
    //点击二级分类标题
    subTabsSelect: function subTabsSelect(i) {
      this.subTabsSelectIndex = i;
      uni.navigateTo({
        url: '../searchDetail/searchDetail?cat_id=' + this.subTabs[i].id });

    },
    //跳转城市定位
    toLocation: function toLocation() {
      uni.navigateTo({
        url: "../location/location?city=" + this.localCity });

    },
    getTabs: function getTabs() {var _this8 = this;
      uni.request({
        url: this.websiteUrl + "/api/Goods/categoryList",
        method: "POST",
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            _this8.tabs = res.data.data;
            return;
          }
          _this8.showToast(res.data.msg);
        },
        fail: function fail() {
          _this8.showToast('系统繁忙，请稍后重试！');
        } });

    },
    getCity: function getCity() {var _this9 = this;
      uni.getLocation({
        type: 'wgs84',
        success: function success(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          console.log('当前位置的经度：' + longitude + ',当前位置的纬度：' + latitude);
          console.log(_this9.mapKey);
          var mapKey = _this9.mapKey;
          uni.request({
            url: "https://apis.map.qq.com/ws/geocoder/v1/?location=".concat(latitude, ",").concat(longitude, "&key=").concat(mapKey),
            success: function success(res) {
              console.log(res.data.result.ad_info.city);
              _this9.localCity = res.data.result.ad_info.city;
              uni.setStorageSync('localCity', _this9.localCity);
            } });

        },
        fail: function fail(err) {
          console.log(err);
          uni.navigateTo({
            url: "../location/location" });

        } });

    },
    getList: function getList() {var _this10 = this;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/Index/index',
        data: {
          city: this.localCity,
          keywords: "",
          page: 1,
          type: 0 },

        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            _this10.goods = res.data.data;
            return;
          }
          _this10.showToast(res.data.msg);
        } });

    },
    loadMoreGoods: function loadMoreGoods() {var _this11 = this;
      if (this.stopLoad) {
        return;
      }
      this.page++;
      this.setheader();
      uni.request({
        url: this.websiteUrl + '/api/Index/index',
        data: {
          city: this.localCity,
          keywords: "",
          page: this.page,
          type: 0 },

        header: this.header,
        success: function success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            if (res.data.data.length == 0) {
              _this11.stopLoad = true;
              return;
            }
            for (var i = 0; i < res.data.data.length; i++) {
              _this11.goods.push(res.data.data[i]);
            }
            return;
          }
          _this11.showToast(res.data.msg);
        } });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */
/*!*******************************************************************************************************!*\
  !*** D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/HBuilderX.2.3.0.20190919.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./indexPage.vue?vue&type=style&index=0&lang=css& */ 23);
/* harmony import */ var _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_3_0_20190919_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_indexPage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 23 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/smallRoutineProjects/shop_erp/pages/indexPage/indexPage.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[16,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/indexPage/indexPage.js.map