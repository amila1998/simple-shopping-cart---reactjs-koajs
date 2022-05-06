import koa from 'koa';
import json from "koa-json";
import cors from "koa-cors";
import bodyparser from 'koa-bodyparser';
import CookieParser from 'koa-cookie-parser';

import userRouter  from './routers/userRouter.js';
import itemsRouter  from './routers/itemsRouter.js';
import config from './config/index.js';
import orderRouter from './routers/orderRouter.js';

const app = new koa();


app.use(bodyparser());
app.use(json());
app.use(cors());
// {
//     origin: true,
//     credentials: true,
//     Access-Control-Allow-Methods
// }
app.use(CookieParser({
    cookieNameList:['refreshtoken'],
}));


app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(itemsRouter.routes()).use(itemsRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());

//Server listening port
app.listen(config.PORT,()=>{
    console.log("Äpp is Started on port: " + config.PORT);
})