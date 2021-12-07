const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const getErrorMessage = require("../../lib/errorHandler/errorHandler");


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
    const {password}=req.body;
    try{
        let foundUser = await User.findOne({ email: req.body.email }).select(
            "-__v"
        );
        if(!foundUser){
            return res.status(500).json({
                message:"Login Error user not found",
                error:"Please Sign Up"
            });
        }else{
            let matchedPassword = await bcrypt.compare(password,foundUser.password);
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
                process.env.JWT_SECRET,
                {expiresIn:"48h"},
                );
                console.log(foundUser);
                res.json({message:"Login Success", payload: jwtToken});
            }
        };
    }catch(e){
        res.status(500).json(getErrorMessage(e));
    };
};

async function updateUser(req,res){    
    try{
        const {password} = req.body;

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password,salt);
        req.body.password = hashed;
        let updateUser = await User.findOneAndUpdate(
            {email:req.user.email},
            req.body,
            {new:true}
            );
            
        res.json({
            message: "success",
            payload: updateUser
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