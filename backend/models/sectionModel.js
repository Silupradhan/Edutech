const mongoose = require("mongoose")

const sectionSchema = new mongoose.Schema({
   name : {
      type : String,
      required : true
   } ,
   subsection : [{
       tyep : mongoose.Schema.Types.ObjectId,
       ref : "subSection" 
   }]
})

module.exports = mongoose.model("Section",sectionSchema)