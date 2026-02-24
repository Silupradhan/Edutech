const express  = require("express")
require('dotenv').config()
const connectDB = require("./config/db")
const authRouter = require("./routes/authRoute")

const app = express()
const PORT = process.env.PORT || 9000

app.use(express.json())

app.use("/api/v1/",authRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log("server is running on port 4000");
    
})


