import express from 'express';
import loginController from '../controllers/loginController';
import { homeController } from '../controllers/index';

const appRouter = express.Router();

appRouter.get('/', homeController);
appRouter.post('/login', loginController);

export default appRouter;
