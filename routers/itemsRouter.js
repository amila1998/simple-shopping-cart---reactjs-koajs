import koaRouter from 'koa-router';
import { addCart, addPromotions, addWatchedList, allItems, createItem, deleteItem, deletePromotion, editItem, editPromotion, getAPromotionCode, getCart, getwatchedList, viewPromotions } from '../controllers/itemsController.js';
import auth from '../middleware/auth.js';
import authTrader from '../middleware/authTrader.js';

const itemsRouter = new koaRouter(({ prefix: '/items' }));

itemsRouter.post('/addCart',auth, addCart);
itemsRouter.get('/getCart',auth, getCart);

itemsRouter.post('/addwatchList',auth, addWatchedList);
itemsRouter.get('/getWatchList',auth, getwatchedList);

itemsRouter.get('/allItems',allItems);
itemsRouter.post('/createItems',auth,authTrader,createItem);
itemsRouter.delete('/deleteItem/:itemID',auth,authTrader ,deleteItem);
itemsRouter.put('/editItem/:itemID',auth,authTrader ,editItem);

itemsRouter.post("/createPromotion",auth,authTrader,addPromotions);
itemsRouter.get("/getAPromotionCode/:promotionCode",getAPromotionCode);
itemsRouter.get("/viewPromotions",auth,authTrader,viewPromotions);
itemsRouter.put("/updatePromotion/:promotionCode",auth,authTrader,editPromotion);
itemsRouter.delete("/deletePromotion/:promotionCode",auth,authTrader, deletePromotion);


export default itemsRouter;