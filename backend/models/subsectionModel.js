const mongoose = require("mongoose")

const subsectionSchema  =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    videoUrl : {
        type : String,
        required:true
    },
    duration:{
        type : String
    }
})

module.exports = mongoose.model("SubSection",subsectionSchema)