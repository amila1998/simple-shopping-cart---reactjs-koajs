const users = new Map();
let message,status;

export const register = async (ctx)=>{
    try {
        const user = await ctx.request.body;
        const {name,email,password,role}=user;
        if(!name||!email||!password||!role){
            message="fill all the fields";
            status=404;
        }
        const exitUser = users.has(email);
        if(exitUser){
            message="Already have an Account";
            status=404;
        }else{
            const hashPassword =""
            users.set(email, { 
               name: name, 
               email: email, 
               password: hashPassword, 
               role: role 
            });
            message="Registration Successfull !";
            status=200;

        }
    } catch (error) {
        message=error;
        status=500;
    }
    ctx.body = message;
    ctx.status = status;
} 


export const read = async(ctx)=>{
    ctx.body = "hiiiiiiiiii";
}