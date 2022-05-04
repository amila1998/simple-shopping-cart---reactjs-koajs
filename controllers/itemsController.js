import { users,myCart, myWatchedList, items } from "../data/data.js";

let message,status;

export const addCart = async(ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email)
        if(!user){
            status=400;
            message="User does not exist."
        }else{
            const cart = ctx.request.body;
            await myCart.set(ctx.request.user.email,{email:ctx.request.user.email,Items:[cart]});
            status=200;
            message="Added to cart";
        }

    } catch (err) {
        status=200;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
};


export const getCart = async(ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email)
        if(!user){
            status=400;
            message="User does not exist."
        }else{
            const exitCart= await myCart.has(ctx.request.user.email);
            if (exitCart) {
                const cart = await myCart.get(ctx.request.user.email);
                status=200;
                message=cart ;
            } else {
                status=200;
                message="no Items" ;
            }
        }

    } catch (err) {
        status=200;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
};



export const addWatchedList = async(ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email)
        if(!user){
            status=400;
            message="User does not exist."
        }else{
            const watchedList = ctx.request.body;
            await myWatchedList.set(ctx.request.user.email,{email:ctx.request.user.email,Items:[watchedList]});
            status=200;
            message="Added to cart";
        }

    } catch (err) {
        status=200;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
};

export const getwatchedList = async(ctx)=>{
    try {
        const user = await users.has(ctx.request.user.email)
        if(!user){
            status=400;
            message="User does not exist."
        }else{
            const exitWatchedList= await myWatchedList.has(ctx.request.user.email);
            if (exitWatchedList) {
                const watchedList = await myWatchedList.get(ctx.request.user.email);
                status=200;
                message=watchedList ;
            } else {
                status=200;
                message="no Items" ;
            }
        }

    } catch (err) {
        status=200;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
};

export const createItem =async(ctx)=>{
    try {
        const {itemID, title, price, description, category,qty} = ctx.request.body;
       

        const exitItem = await items.has(itemID)
        if(exitItem){
            status=400;
            message="This product already exists.";
        }else{
   
            items.set(itemID,{itemID:itemID,title:title, price:price, description:description, category:category, qty:qty})
            status=200;
            message="Created a product";
        }
        

    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}


export const editItem = (ctx)=>{
    try {
        const {itemID, title, price, description, category,qty} = ctx.request.body;
        const item = items.has(itemID);
        if (!item) {
            status=400;
            message="No item Found";
        } else {
            
            items.set(itemID,{itemID:itemID,title:title, price:price, description:description, category:category, qty:qty});
            status=200;
            message="update Success";
        }
        
    } catch (err) {
        status=500;
        message=err.message;
    }
    ctx.body = message;
    ctx.status = status;
}

export const deleteItem=async(ctx) =>{
    try {
        await items.delete(ctx.request.params.itemID)
        status=200;
        message="Deleted a Product";
        
    } catch (err) {
        status=500;
        message=err.message;
        
    }
    ctx.body = message;
    ctx.status = status;
}

export const allItems=async(ctx) =>{
    try {
        
        status=200;
        message=[...items.values()];
        
    } catch (err) {
        status=500;
        message=err.message;
        
    }
    ctx.body = message;
    ctx.status = status;
}