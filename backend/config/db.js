const mongoose = require("mongoose")

const connectDB = async() =>{
  try {
    const conn =await mongoose.connect("mongodb://127.0.0.1:27017/Edutech")
    console.log(`mongodb is connected on : ${conn.connection.host}`);
    
  } catch (error) {
    console.log("db is not connected" ,error)
  }
}

module.exports = connectDB