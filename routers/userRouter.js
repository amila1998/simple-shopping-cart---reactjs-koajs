import koaRouter from 'koa-router';
import { read, register } from '../controllers/userController.js';

const userRouter = new koaRouter();

userRouter.get('/', read);
userRouter.post('/', register);





export default userRouter;