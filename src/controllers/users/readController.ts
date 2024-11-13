import { Request, Response } from 'express';
import { readUser } from '../../models/userModel';

const readController = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (id) {
      const user = await readUser(id);
      return res.status(200).json(user);
    }

    return res.status(404).json('A rota necessita de id');
  } catch (err) {
    res.status(404).json('Erro ao tentar encontrar Usuário.');
  }
};
export default readController;
