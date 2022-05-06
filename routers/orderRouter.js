import auth from '../middleware/auth.js';
import authTrader from '../middleware/authTrader.js';
import koaRouter from 'koa-router';
import { addOrder, getOrders } from '../controllers/orderController.js';

const orderRouter = new koaRouter(({ prefix: '/orders' }));

orderRouter.post("/addOrder",auth, addOrder);
orderRouter.get("/getOrders",auth,authTrader, getOrders);



export default orderRouter;