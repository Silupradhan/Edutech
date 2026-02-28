const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    refreshToken: {
       type : String,
       required : true 
    },
    email : {
        type : String,
        required : true
    },
    accountType : {
        type : String,
        enum  :["Admin","Student","Instructor"]
    }
})

module.exports = mongoose.model("Session",sessionSchema)