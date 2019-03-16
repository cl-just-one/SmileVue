const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"

exports.connect = () => {
    let MaxConnectTimes = 0;

    // 链接数据库
    mongoose.connect(db);

    return new Promise((resolve, reject) => {
        // 增加数据库连接的监听
        mongoose.connection.on('disconnected', () => {
            console.log("************数据库断开**************");
            if (MaxConnectTimes <= 3) {
                MaxConnectTimes++;
                // 进行重连
                mongoose.connect(db);
            } else {
                reject();
                new Error("数据库出现问题，程序无法搞定，请人为修理......'")
            }
        });
        mongoose.connection.on('error', (err) => {
            console.log("************数据库错误" + err);
            if (MaxConnectTimes <= 3) {
                MaxConnectTimes++;
                // 进行重连
                mongoose.connect(db);
            } else {
                reject(err);
                new Error("数据库出现问题，程序无法搞定，请人为修理......'")
            }
        });
        // 链接打开
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected successfully!');
            resolve();
        });
    });
}