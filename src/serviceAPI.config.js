const BASEURL = "https://www.easy-mock.com/mock/5c85c410a37c3b12bb906f52/index/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShopingMallInfo: BASEURL + "index",
    registerUser: LOCALURL + "user/register", // 用户注册接口
    login: LOCALURL + "user/login", // 用户登录接口
    getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo", // 商品详情接口
    getCategoryList: LOCALURL + "goods/getCategoryList", // 获得大类商品列表接口
    getCategorySubList: LOCALURL + "goods/getCategorySubList", // 获得小类商品列表接口
    getGoodsListByCatrgorySubId: LOCALURL + "goods/getGoodsListByCatrgorySubId" // 获得商品列表接口
}

module.exports = URL;