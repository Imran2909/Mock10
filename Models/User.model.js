
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
})
const UserModel = mongoose.model("User", UserSchema)
module.exports = {
    UserModel
}