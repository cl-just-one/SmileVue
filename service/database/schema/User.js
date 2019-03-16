const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
    userId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
})

// 发布模型
mongoose.model('User', UserSchema)