const mongoose = require("mongoose")
const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:24*60*60 // 24 hours
    }
});      

const blackListTokenModel = mongoose.model("blacklisttoken",blackListTokenSchema);
module.exports = blackListTokenModel;