import { users } from "../data/data.js";

const authTrader = async (ctx,next) => {
    try {
        const user = await users.has(ctx.request.user.email);
        if (user) {
            const userDetails = users.get(ctx.request.user.email);
            if (userDetails.role=="trader") {
                next();
            } else {
                ctx.status=400;
                ctx.body="Invalid Trader Authentication";
            }
            
        } else {
            ctx.status=400;
            ctx.body="User Not Found!!";
        }

    } catch (error) {
        ctx.status=500;
        ctx.body=error.message;
    }
}

export default authTrader;