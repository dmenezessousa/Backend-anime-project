const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const getErrorMessage = require("../../lib/errorHandler");


async function userSignUp (req,res){
    const {firstName , lastName, userName, email, password}=req.body;
    try{
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password,salt);

        const createUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashed,
        });

        let savedUser = await createUser.save();
        res.json({message:"Success",payload:savedUser});
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    };
};

async function userLogin (req, res){
    const {email,password}=req,body;
    try{
        let foundUser = await User.findOne({email:email});
        if(!foundUser){
            return res.status(500).json({
                message:"Login Error user not found",
                error:"Please Sign Up"
            });
        }else{
            let matchedPassword = await bcrypt.compare(password,foundUser.passowrd);
            if(!matchedPassword){
                return res.status(500).json({
                    message: "Login Error",
                    error: "please check email and password",
                });
            }else{
                let jwtToken = jwt.sign({
                    email: foundUser.email,
                    userName: foundUser.userName,
                },
                precess.env.JWT_SECRET,
                {expiresIn:"48h"},
                );
                res.json({message:"Login Success", payload: jwtToken});
            }
        };
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    };
};

async function updateUser(req,res){
    const password = req.body
    try{
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password,salt);
        req.body.passowrd = hashed;

        let updateUser=await User.findOneAndUpdate(
            {email:email},
            req.body,
            {new:true}
            );
        res.json({
            message: "success",
            payload: updateUser,
        });

    }catch(e){
        res.status(500).json(getErrorMessage(e));
    }
}
module.exports = {
    userSignUp,
    userLogin,
    updateUser
};