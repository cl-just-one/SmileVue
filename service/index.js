const Koa = require('koa2')
const app = new Koa()

const { connect } = require('./database/init.js')

;
(async() => {
    await connect()
})()

app.use(async(ctx) => {
    ctx.body = "<h1>Hello koa2!</h1>"
})

app.listen(3000, () => {
    console.log("[server] start at port 3000");
})