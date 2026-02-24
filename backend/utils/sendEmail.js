const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOtpMail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"OTP Service" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP",
            html: `<p>Your OTP code is: ${otp}</p>`
        });
        return info;
    } catch (err) {
        console.log("Email send error: ", err.message);
        throw err;
    }
};

module.exports =  sendOtpMail ;
