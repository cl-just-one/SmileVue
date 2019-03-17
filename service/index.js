const Koa = require('koa2')
const app = new Koa()
const mongoose = require('mongoose')

const { connect, initSchemas } = require('./database/init.js')

;
(async() => {
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({
        userName: 'xaiwenj',
        password: '123456789'
    })
    oneUser.save().then(() => {
        console.log('插入成功');
    })
    let users = await User.findOne({}).exec()
    console.log('------------------')
    console.log(users)
    console.log('------------------')
})()

app.use(async(ctx) => {
    ctx.body = "<h1>Hello koa2!</h1>"
})

app.listen(3000, () => {
    console.log("[server] start at port 3000");
})