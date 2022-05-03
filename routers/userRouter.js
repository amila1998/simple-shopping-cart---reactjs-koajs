import koaRouter from 'koa-router';

import { login,   getUser, register, logout, refreshToken } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRouter = new koaRouter(({ prefix: '/user' }));

userRouter.get('/', auth,  getUser);
userRouter.post('/', register);
userRouter.post('/login', login);
userRouter.post('/logout',auth, logout);
userRouter.post('/refresh_token',auth, refreshToken);




export default userRouter;