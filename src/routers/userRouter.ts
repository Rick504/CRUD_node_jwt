import express from 'express';
import deleteController from '../controllers/users/deleteController';
import { listUsersController, listUsersHistoryUpdateController, listUsersHistoryDeleteController } from '../controllers/tests/index';
import registerController from '../controllers/users/insertController';
import updateController from '../controllers/users/updateController';
import readController from '../controllers/users/readController';
 import { verifyToken } from '../middlewares/verifyToken';
import { config } from '../../config';

const userRouter = express.Router();

userRouter.get('/user/', readController);
userRouter.post('/register', registerController);
userRouter.put('/update/user/', verifyToken, updateController);
userRouter.delete('/delete/user/', verifyToken, deleteController);

if (config.testMode) userRouter.get('/users', listUsersController);
if (config.testMode) userRouter.get('/users/update/history', listUsersHistoryUpdateController);
if (config.testMode) userRouter.get('/users/delete/history', listUsersHistoryDeleteController);

export default userRouter;
