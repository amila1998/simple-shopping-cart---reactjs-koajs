import koa from 'koa';
import json from "koa-json";
import cors from "koa-cors";
import bodyparser from 'koa-bodyparser';
import CookieParser from 'koa-cookie-parser';

import userRouter  from './routers/userRouter.js';
import config from './config/index.js';

const app = new koa();


app.use(bodyparser());
app.use(json());
app.use(cors());
app.use(CookieParser({
    cookieNameList:['refreshtoken','foo'],
}));


app.use(userRouter.routes()).use(userRouter.allowedMethods());

//Server listening port
app.listen(config.PORT,()=>{
    console.log("Äpp is Started on port: " + config.PORT);
})