const express  = require("express")
const connectDB = require("./config/db")

const app = express()
const PORT =4000

app.listen(PORT,()=>{
    connectDB()
    console.log("server is running on port 4000");
    
})


