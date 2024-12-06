import { Request, Response } from 'express';
import { getUsers, getUsersHistory } from '../../models/userModel';

export const listUsersController = async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json({ mensagem: 'List users', users });
}

export const listUsersHistoryController = async (req: Request, res: Response) => {
    const users_history = await getUsersHistory();
    res.json({ mensagem: 'List users history', users_history });
}

