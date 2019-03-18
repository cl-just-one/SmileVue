const Router = require("koa-router")
let router = new Router()
const mongoose = require("mongoose")

router.get('/', async(ctx) => {
    ctx.body = "这是用户操作首页"
});

router.post('/register', async(ctx) => {
    // 取得Model
    const User = mongoose.model("User")

    // 把从前端接收的POST数据封装成一个新的user对象
    const newUser = new User(ctx.request.body)
    console.log(ctx.request.body);

    // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(() => {
        // 成功返回code=200，并返回成功信息
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((err) => {
        // 失败返回code=500，并返回错误信息
        ctx.body = {
            code: 500,
            message: err
        }
    })
});

router.post('/login', async(ctx) => {
    // 得到前端传递过来的数据
    const loginUser = ctx.request.body;
    const userName = loginUser.userName;
    const password = loginUser.password;
    // 引入User的model
    const User = mongoose.model('User');
    // 查找用户名是否存在，如果存在开始比对密码
    await User.findOne({
        userName: userName
    }).exec().then(async(result) => {
        if (result) {
            // 当用户名存在时，开始比对密码
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then((isMatch) => {
                    // 返回比对结果
                    ctx.body = {
                        code: 200,
                        message: isMatch
                    }
                }).catch(err => {
                    // 出现异常，返回异常
                    console.log(error)
                    ctx.body = {
                        code: 500,
                        message: err
                    }
                })
        } else {
            ctx.body = { code: 500, message: '用户名不存在' }
        }
    }).catch(error => {
        console.log(error)
        ctx.body = { code: 500, message: error }
    })
});

module.exports = router;