const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data-json/newGoods.json', 'utf8', (err, data) => {
        if (err) {
            console.log('读取文件失败');
        }
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')

        data.map((item, idx) => {
            let newGoods = new Goods(item)
            newGoods.save().then(() => {
                saveCount++
                console.log('插入成功' + saveCount);
            }).catch(err => {
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '开始数据插入中'
});

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data-json/category.json', 'utf8', (err, data) => {
        if (err) {
            console.log('读取文件失败');
        }
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')

        data.RECORDS.map((item, idx) => {
            let newCategory = new Category(item)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功' + saveCount);
            }).catch(err => {
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '开始数据插入中'
});

router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data-json/category_sub.json', 'utf8', (err, data) => {
        if (err) {
            console.log('读取文件失败');
        }
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')

        data.RECORDS.map((item, idx) => {
            let newCategorySub = new CategorySub(item)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功' + saveCount);
            }).catch(err => {
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '开始数据插入中'
});

// 获取商品详细信息接口
router.post('/getDetailGoodsInfo', async(ctx) => {
    let goodsId = ctx.request.body.goodsId;

    const Goods = mongoose.model('Goods')
    await Goods.findOne({ ID: goodsId }).exec().then(res => {
        ctx.body = {
            code: 200,
            message: res
        }
    }).catch(error => {
        console.log(error)
        ctx.body = { code: 500, message: error }
    })
})

module.exports = router