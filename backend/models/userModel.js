const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    image: {
        type : String,

    },
    accoutType : {
        type :String,
        require : true,
        enum : ["Admin", "Instructor", "Student"]
    },
    addititonalDetails :{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Profile"

    },
    courses : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }] 
    }


    
})

module.exports = mongoose.model("User",userSchema)