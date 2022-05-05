import koaRouter from 'koa-router';

import { login,   getUser, register, logout, refreshToken, getUserDetails } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import authTrader from '../middleware/authTrader.js';

const userRouter = new koaRouter(({ prefix: '/user' }));

userRouter.get('/', auth ,  getUser);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', auth , logout);
userRouter.get('/refresh_token/:token', refreshToken);
userRouter.get('/getUserDetails/:email',auth, authTrader, getUserDetails);





export default userRouter;