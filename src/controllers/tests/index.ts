import { Request, Response } from 'express';
import { getUsers } from '../../models/userModel';

export const listUsersController = async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json({ mensagem: 'List users', users });
  }

