import koaRouter from 'koa-router';
import { addCart, addWatchedList, getCart, getwatchedList } from '../controllers/itemsController.js';
import auth from '../middleware/auth.js';

const itemsRouter = new koaRouter(({ prefix: '/items' }));

itemsRouter.post('/addCart',auth, addCart);
itemsRouter.get('/addCart',auth, getCart);
itemsRouter.post('/addWatchedList',auth, addWatchedList);
itemsRouter.get('/getWatchedList',auth, getwatchedList);

export default itemsRouter;