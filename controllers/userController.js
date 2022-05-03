import bcrypt from "bcryptjs";

const users = new Map();
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

                message="Registration Successfull !!! , Please Login :)";
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
    ctx.body = "hiiiiiiiiii";
}

export const read = async(ctx)=>{
    ctx.body = "hiiiiiiiiii";
}