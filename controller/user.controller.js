import User from '../model/User.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const registerUser = async (req, res) => {
 //get data
 //validate data
 //check if user already exists
 //create a user in database

 //create a verification token
 //send verification email
 //send success status to client
const{name, email, password} = req.body;    
    if(!name || !email || !password){
        return res.status(400).json({
            message: 'Please provide all required fields'
        });
    } 
    try {
    const existingUser= await User.findOne({ email });
            if(existingUser){
                return res.status(400).json({
                    message: 'User already exists'
                });
            }

    const user = await User.create(
               { name, email, password });
     console.log(user);
             
       if(!user){
       return res.status(400).json({
            message: 'User not created',
        });
       } 
     const token = crypto.randomBytes(32).toString('hex');
     console.log(token);
     user.verificationToken = token;
        await user.save();

        //send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD, // fixed typo here
            },
});
const mailOptions = {
    from:  process.env.MAILTRAP_PASSWORD_SENDER_EMAIL, // sender address    

    to: email,//list of receivers
    subject: 'Verify your email',
    text: `Please click on the following link to verify your email: 
     ${process.env.BASE_URL}/api/v1/users/verify/${token}`,

};
await transporter.sendMail(mailOptions)
res.status(201).json({
    message: 'User registered successfully. Please check your email to verify your account.',
    success: true,
});

} catch (error) {
    res.status(400).json({
        message: 'Server error',
     success: false,
    });
}
};

const verifyUser = async (req, res) => {
    //get token from url
    //validate token
    //find user with the token
    //if not
    //set isVerified to true
    //remove verification token
    //send success status to client
    //save
    //return response

const { token } = req.params;
console.log(token);
if(!token){
    return res.status(400).json({
        message: 'Invalid token',
    }); 
}
const user = await User.findOne({ verificationToken: token });
if(!user){
    return res.status(400).json({
        message: 'Invalid token',
    }); 
}
user.isVerified = true;
user.verificationToken = undefined;
await user.save();
res.status(200).json({
    message: 'Email verified successfully',
    success: true,
});
};
export { registerUser,verifyUser };
