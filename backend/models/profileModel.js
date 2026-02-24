const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    dob: {
        type: String
    },
    phone: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    profession: {
        type: String
    },
    about: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


})

module.exports = mongoose.model("Profile", profileSchema)