import { Request, Response } from 'express';
import { deleteUser } from '../../models/userModel';

const deleteController = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (id) {
      await deleteUser(id);
      return res.status(204).json('Usuário deletado com sucesso !!');
    }

    return res.status(404).json('A rota necessita de id');
  } catch (err) {
    res.status(404).json('Erro ao tentar deletar conta.');
  }
};
export default deleteController;
