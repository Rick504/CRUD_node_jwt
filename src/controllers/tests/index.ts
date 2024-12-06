import { Request, Response } from 'express';
import { getTableData } from '../../models/userModel';

export const listUsersController = async (req: Request, res: Response) => {
    const users = await getTableData('users');
    res.json({ mensagem: 'List users', users });
}

export const listUsersHistoryUpdateController = async (req: Request, res: Response) => {
    const users_history_update = await getTableData('users_history_update');
    res.json({ mensagem: 'List users history update', users_history_update });
}

export const listUsersHistoryDeleteController = async (req: Request, res: Response) => {
    const users_history_delete = await getTableData('users_history_delete');
    res.json({ mensagem: 'List users history delete', users_history_delete });
}

