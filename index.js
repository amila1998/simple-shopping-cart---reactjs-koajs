import koa from 'koa';
import json from "koa-json";
import cors from "koa-cors";
import bodyparser from 'koa-bodyparser';
import userRouter  from './routers/userRouter.js';

const app = new koa();
const PORT = 5000;

app.use(bodyparser());
app.use(json());
app.use(cors());


app.use(userRouter.routes()).use(userRouter.allowedMethods());

//Server listening port
app.listen(PORT,()=>{
    console.log("Äpp is Started on port: " + PORT);
})