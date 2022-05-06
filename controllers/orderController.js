import { orders, users } from "../data/data.js";
import { randomUUID } from 'crypto';
let message,status;

export const addOrder = async (ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email);
        if(!user){
            status=400;
            message="User does not exist.";
        }else{
            const {cart,promotionCode, address, total} = ctx.request.body;
            
            const orderID = randomUUID()
            await orders.set(orderID,{orderID:orderID, userEmail:ctx.request.user.email, promotionCode:promotionCode , cart:cart, address:address , total:total});
            status=200;
            message="Order Added";
        }
    } catch (error) {
        status=500;
        message=error.message;
    }
    ctx.body = message;
    ctx.status = status;

}


export const getOrders = (ctx)=>{
    try {
        status=200;
        message=[...orders.values()];
        
    } catch (error) {
        status=500;
        message=error.message;
    }
    ctx.body = message;
    ctx.status = status;
}