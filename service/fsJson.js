const fs = require('fs')

fs.readFile('./data-json/goods.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data)
    let i = 0
    let pushData = []
    newData.RECORDS.map(function(item, idx) {
        if (item.IMAGE1) {
            i++
            console.log(item.NAME);
            pushData.push(item)
        }
    })
    console.log(i);
    console.log(pushData);
    fs.writeFile('./data-json/newGoods.json', JSON.stringify(pushData), function(err) {
        if (err) {
            console.log('写入文件失败');
        } else {
            console.log('写入文件成功');
        }
    })
})