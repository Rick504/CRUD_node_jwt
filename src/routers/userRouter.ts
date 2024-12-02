import express from 'express';
import deleteController from '../controllers/users/deleteController';
import registerController from '../controllers/users/insertController';
import updateController from '../controllers/users/updateController';
import readController from '../controllers/users/readController';
import { getUsers } from '../models/userModel';
import { verifyToken } from '../middlewares/verifyToken';
import { config } from '../../config';

const userRouter = express.Router();

userRouter.get('/', (_, res) => res.json({ mensagem: 'Aplicação no Ar!' }));

if (config.testMode) {
  userRouter.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json({ mensagem: 'List users', users });
  });
}

userRouter.get('/user/', readController);
userRouter.post('/register', registerController);
userRouter.put('/update/user/', verifyToken, updateController);
userRouter.delete('/delete/user/', verifyToken, deleteController);

export default userRouter;
