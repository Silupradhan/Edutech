const User = require("../models/userModel")
const Otp = require("../models/otpModel")
const otpGenerator = require("otp-generator");
const sendOtpMail = require("../utils/sendEmail");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const Session = require("../models/sessionModel")

const hash = (token)=>{
    return crypto.createHash("sha256").update(token).digest("hex")
}

const sendOtp = async (req, res) => {
    try {
      // fetch email from client
      const {email} = req.body;
      
      //validation
      if(!email){
        return res.status(401).json({
            success : false,
            message : "please enter email"
        })
      }

      // check weather the user is present in the database or not
      const user = await User.findOne({email})

      if(user){
        return res.status(401).json({
            sucess: false,
            message : "User is already registered enter another email"
        })
      }

      // make otp
     const otp = otpGenerator.generate(6,{
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false,
        digits : true
     })

     //send otp in gmail
     try {
        await sendOtpMail(email,otp)
     } catch (error) {
        console.log("error" , error);
     }


    //  save in db
   await Otp.create({
  email: email,
  otp: otp
})
    return res.status(200).json({
        success : true,
        message : "send otp successfully"
    })


    } catch (error) {
        console.log("error : ", error)
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

const Signup = async(req,res)=>{
    try {
        //fetch data from client
          const {firstname,lastname,email,password,confirm_password,accountType,userOtp} = req.body

        //validation
        if(!firstname || !lastname || !email || !password || !confirm_password || !accountType || !userOtp){
            return res.status(401).json({
                success : false,
                message : "please fill all details"
            })
        }

        //match password with confirm password
        if(password !== confirm_password){
            return res.status(401).json({
                success : false,
                message : "password does not match with confirm password"
            })
        }

        //check user already exist or not
        const user = await User.findOne({email : email})

        if(user){
            return res.status(401).json({
                success : false,
                message : "email already exist"
            })  
        }
        

        // validate otp
        const otpRes = await Otp.findOne({email}).sort({createdAt  : -1})
        
        if(!otpRes){
             return res.status(401).json({
                success : false,
                message : "otp expire, send again"
            }) 
        }

        //match otp
        if(userOtp !== otpRes.otp){
            return res.status(401).json({
                success : false,
                message : "otp is invalid"
            }) 
        }

        // hash password
        const hashPassword = await bcrypt.hash(password,10)

        //save user in db
        const createUser = await User.create({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : hashPassword,
            accountType  : accountType
        })
        return res.status(201).json({
            success : true,
            message  : "user created sucessfully",
            createUser
        })



    } catch (error) {
       return res.status(500).json({
        error : error,
        message : "internal server error"
       })
    }
}

const Signin = async(req,res)=>{
    try {
        //fetch data from client
        const {email,password}  = req.body

        //validate user input data
        if(!email || !password){
            return res.status(401).json({
                success : false,
                message : "please fill all the field"
            })
        }

        // check user is exist or not in db
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(401).json({
                success :  false,
                message : "user not found please register"
            })
        }

        // compare password 
        const isMatchPassword = await bcrypt.compare( password, userExist.password)

        if(!isMatchPassword){
            return res.status(401).json({
                success : false,
                message : "password does not match"
            })
        }

        //generate access token
        const accessToken = jwt.sign({
           email : userExist.email,
           id : userExist._id,
           accountType : userExist.accountType
        },process.env.JWT_SECRATE, {expiresIn : "15m"})

        //generate refresh token
        const refreshToken =  crypto.randomBytes(20).toString("hex") 

        //save refresh token in db
        await Session.create({
            userId : userExist._id,
            email : userExist.email,
            refreshToken : hash(refreshToken),
            accountType : userExist.accountType,
            expireAt : new Date(Date.now() +30 * 24 *60 *60 *1000)

        })

        // send refreshtoken in cookies
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : false,
            sameSite : "lax"
        })

        // send access token in response
        res.status(200).json({
            success : true,
            message : "signin sucessfully",
            accessToken
        })
    } catch (error) {
         console.log("error", error)
         return res.status(500).json({
            success : false,
            message : "internal server error"
         })
    }
}




module.exports = { sendOtp, Signup, Signin }
