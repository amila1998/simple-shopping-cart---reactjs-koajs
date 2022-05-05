import koaRouter from 'koa-router';
import { addCart, addWatchedList, allItems, createItem, getCart, getwatchedList } from '../controllers/itemsController.js';
import auth from '../middleware/auth.js';

const itemsRouter = new koaRouter(({ prefix: '/items' }));

itemsRouter.post('/addCart',auth, addCart);
itemsRouter.get('/getCart',auth, getCart);

itemsRouter.post('/addWatchedList',auth, addWatchedList);
itemsRouter.get('/getWatchedList',auth, getwatchedList);

itemsRouter.get('/allItems',allItems);
itemsRouter.post('/createItems',createItem);


export default itemsRouter;