import koaRouter from 'koa-router';
import { addCart, addWatchedList, allItems, createItem, deleteItem, editItem, getCart, getwatchedList } from '../controllers/itemsController.js';
import auth from '../middleware/auth.js';
import authTrader from '../middleware/authTrader.js';

const itemsRouter = new koaRouter(({ prefix: '/items' }));

itemsRouter.post('/addCart',auth, addCart);
itemsRouter.get('/getCart',auth, getCart);

itemsRouter.post('/addWatchedList',auth, addWatchedList);
itemsRouter.get('/getWatchedList',auth, getwatchedList);

itemsRouter.get('/allItems',allItems);
itemsRouter.post('/createItems',createItem);
itemsRouter.delete('/deleteItem/:itemID',auth,authTrader ,deleteItem);
itemsRouter.put('/editItem/:itemID',auth,authTrader ,editItem);


export default itemsRouter;