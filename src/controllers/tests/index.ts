import { Request, Response } from 'express';
import { getTableData } from '../../models/userModel';

export const listUsersController = async (req: Request, res: Response) => {
    const users = await getTableData('users');
    res.json({ mensagem: 'List users', users });
}

export const listUsersHistoryController = async (req: Request, res: Response) => {
    const users_history = await getTableData('users_history_update');
    res.json({ mensagem: 'List users history', users_history });
}

