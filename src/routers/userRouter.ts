import express, { Request, Response } from 'express';
import deleteController from '../controllers/users/deleteController';
import registerController from '../controllers/users/insertController';
import updateController from '../controllers/users/updateController';
import readController from '../controllers/users/readController';
import { getUsers } from '../models/userModel';
import { verifyToken } from '../middlewares/verifyToken';

const userRouter = express.Router();

// TESTE
userRouter.get('/', (req: Request, res: Response) => {
  res.json({ mensagem: 'Aplicação no Ar!' });
});

userRouter.get('/users', async (req: Request, res: Response) => {
  const users = await getUsers();
  return res.json(users);
});

userRouter.get('/user/', readController);
userRouter.post('/register', registerController);
userRouter.put('/update/user/', verifyToken, updateController);
userRouter.delete('/delete/user/', verifyToken, deleteController);

export default userRouter;
