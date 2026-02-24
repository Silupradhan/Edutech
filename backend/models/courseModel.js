const mongoose = require("mongoose")

const courseSchema  = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description : {
       type : String,
        required : true
    }, 
    price : {
        type : String,
        required:true
    },
    tags : [{
        type : String
    }],
    thumbnail : {
        type : String,
        required : true
    },
    benifits : {
      type : String,
      required : true
    },
    prerequirement :{
        type: String,
        required : true

    },
    instructor : {
       type :  mongoose.Schema.Types.ObjectId,
       ref : "User"
    },
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"

    },
    enroleStudent : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"

    }],
    sections :[{
         type : mongoose.Schema.Types.ObjectId,
         ref: "Section"
    }],
    ratingAndReviews : [{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Rav"
    }]



})

module.exports = mongoose.model("Course",courseSchema)