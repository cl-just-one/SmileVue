const BASEURL = "https://www.easy-mock.com/mock/5c85c410a37c3b12bb906f52/index/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShopingMallInfo: BASEURL + "index",
    registerUser: LOCALURL + "user/register" // 用户注册接口
}

module.exports = URL;