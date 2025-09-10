import express = require('express');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(express.json());
// @ts-ignore



const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 password reset requests per windowMs
    message: 'Too many password reset attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Store OTPs in a simple in-memory object
const validOtp: Record<string, string> = {};


app.post("/generate-otp",otpLimiter, async(req, res) => {
    const email = req.body.email;

    const otp = Math.floor(Math.random() * 1000_000);
    // @ts-ignore
    validOtp[email] = otp;
    console.log(`OTP for ${email} is ${otp}`);
    return res.status(200).json({
        otp:otp
    })
});

app.post("/verify-otp", passwordResetLimiter, async(req, res) => {
    const {email, otp, newPassword} = req.body;
    // @ts-ignore
    if(validOtp[email] == otp) {
        console.log(`Password reset for user ${email} with ${newPassword}`);
        res.json({
            success:true
        })
    }

    else {
        console.log("Incorrect input");
        return res.status(401).json({
            message: "Fail"
        })
    }

    
})

app.listen(3000);