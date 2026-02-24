const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating : {
        type : String
    },
    reviews : {
        type : String
    }
    
})
module.exports = mongoose.model("Rav", ratingSchema)