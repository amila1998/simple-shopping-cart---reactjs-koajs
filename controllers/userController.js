import bcrypt from "bcryptjs";
import config from "../config/index.js";
import jwt from  'jsonwebtoken';
import { users } from "../data/data.js";

let message,status;

export const register = async (ctx)=>{
    try {
        const user = await ctx.request.body;
        const {name,email,password,role}=user;
        if(!name ||!email||!password||!role){
            message="fill all the fields";
            status=404;
        }else{
            const exitUser = await users.has(email);
            if(exitUser){
                message="Already have an Account";
                status=404;
            }else{
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password, salt);
                await users.set(email, { 
                   name: name, 
                   email: email, 
                   password: hashPassword, 
                   role: role 
                });

                message={msg:"Registration Successfull !!! , Please Login :)"};
                status=200;
   
            }
        }
       
    } catch (error) {
        message=error;
        status=500;
    }
    ctx.body = message;
    ctx.status = status;
} 

export const login = async(ctx)=>{
    try {
        const {email, password} = ctx.request.body;

        const user = await users.has(email);
        if(!user){
            status=400;
            message="User does not exist.";
        }else{
            const userDetails = await users.get(email);
            const isMatch = await bcrypt.compare(password, userDetails.password)
            if(!isMatch){
                status=400;
                message="Incorrect password."; 
            }else{
               
                // If login success , create access token and refresh token
                const accesstoken = createAccessToken({email: userDetails.email})
                const refreshtoken = createRefreshToken({email: userDetails.email})

                // ctx.cookies.set('refreshtoken', refreshtoken, { 
                //     httpOnly: true, 
                //     // secureProxy: true,
                //     path: '/user/refresh_token',
                //     maxAge: 7*24*60*60*1000 // 7d
                // });
  
                status=200;
                message={msg:"Login Successfull",token:refreshtoken}; 

            }
                ctx.body = message;
                ctx.status = status;
        }

    } catch (err) {
        status=500;
        message= err.message;
    }
    ctx.body = message;
    ctx.status = status;
}

export const  getUser = async(ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email);
        if(!user){
            status=400;
            message="User does not exist.";
        }else{
            const userDetails = await users.get(ctx.request.user.email);
            status=200;
            message=userDetails;
        }

    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}


export const logout = async(ctx)=>{
        try {
            ctx.cookies.set('refreshtoken','',{path: '/user/refresh_token'});
            message="Logged out";
            status=200;
        } catch (err) {
            message=err.message;
            status=500;
        }
        ctx.body = message;
        ctx.status = status;
}

export const refreshToken = async(ctx)=>{
    try {
        //I try to pass a cookie (koa-coockie-parser) but in postman work perfectly,, but in react frontend not working.. (not parse the cookie).. 
        //So i use this method to to do that refresh the cookie... (but it not a best secure way) 
        const rf_token = ctx.request.params.token;
        if(!rf_token){
            status=400;
            message="Please Login or Register";
        }else{
            jwt.verify(rf_token, config.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err){
                    status=400;
                    message="Please Login or Register";
                }else{
                    const accesstoken = createAccessToken({email: user.email})
                    status=200;
                    message={accesstoken};
                }
            })
           
        }
    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}


export const getUserDetails = async(ctx)=>{
    try {
        const email = ctx.params.email;
        const user = await users.has(email);
        if (user) {
           const userD = await users.get(email);
           status=200;
           message= {email:userD.email,name:userD.name}
        } else {
            status=404;
            message= "user Not Found!";
        }
    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}





const createAccessToken = (user) =>{
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, config.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}