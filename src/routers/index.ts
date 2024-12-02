import express from 'express';
import loginController from '../controllers/loginController';

const appRouter = express.Router();

appRouter.post('/login', loginController);

export default appRouter;
