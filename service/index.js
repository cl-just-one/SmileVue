const Koa = require('koa2')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")

const { connect, initSchemas } = require('./database/init.js')
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

app.use(bodyParser())
app.use(cors())

;
(async() => {
    await connect()
    initSchemas()
        // const User = mongoose.model('User')
        // let oneUser = new User({
        //     userName: 'xaiwenj',
        //     password: '123456789'
        // })
        // oneUser.save().then(() => {
        //     console.log('插入成功');
        // })
        // let users = await User.findOne({}).exec()
        // console.log('------------------')
        // console.log(users)
        // console.log('------------------')
})()

// 装载所有子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx) => {
    ctx.body = "<h1>Hello koa2!</h1>"
})

app.listen(3000, () => {
    console.log("[server] start at port 3000");
})