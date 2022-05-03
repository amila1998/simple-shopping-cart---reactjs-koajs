import koaRouter from 'koa-router';

import { login,   getUser, register } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = new koaRouter(({ prefix: '/user' }));

userRouter.get('/', auth,  getUser);
userRouter.post('/', register);
userRouter.post('/login', login);





export default userRouter;