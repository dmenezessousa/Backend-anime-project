const JwtStrategy = require("passport-jwt").Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;

const User = require("../../users/model/User");
const keys = process.env.JWT_SECRET;

const jwtOpts = {};

jwtOpts.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const userJWTStrategy = new JwtStrategy(jwtOpts,async(payload,done)=>{
    const userEmail =  payload.email;
    try{
        if(userEmail){
            let user = await User.findOne({email:userEmail}).select(
                "-password -__v"
            );
            if(!user || user === null){
                return done(null,false);
            }else{
                return done(null,user);
            }
        }else{
            return done(null,false);
        }
    }catch(e){
        return done(e,false);
    };
});

module.exports = userJWTStrategy;