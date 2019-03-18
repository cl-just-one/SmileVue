const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
    userId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
}, {
    collection: 'user'
})

// 每次存储数据时都要执行
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        } else {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err)
                }
                this.password = hash
                next()
            })
        }
    })
})

// 发布模型
mongoose.model('User', UserSchema)