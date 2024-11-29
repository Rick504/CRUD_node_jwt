import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { softDeleteUser } from '../../models/userModel';

const deleteController = async (req: Request, res: Response) => {
  try {
    const token = req.headers['x-access-token'] as string;
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as { userDataJWT: { id: string } };
    const { id } = decoded.userDataJWT;

    const { success } = await softDeleteUser(id);

    if (!success) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ message: 'Delete de usuário agendado com sucesso.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao tentar deletar conta.' });
  }
};

export default deleteController;
