import { Request, Response } from 'express';
import { getIpAddress } from '../../utils/getIpAddress'
import { updateUser, getUserById } from '../../models/userModel';
import { IUser } from '../../interfaces/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const updateController = async (req: Request, res: Response) => {
  try {
    const token = req.headers['x-access-token'] as string;
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as { userDataJWT: { id: string } };
    const ipAddress = getIpAddress(req)

    const { id } = decoded.userDataJWT;
    const { name, email, password, currentPassword } = req.body;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ msgError: 'Usuário não encontrado.' });
    }

    if (currentPassword && !bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ msgError: 'Senha atual incorreta.' });
    }

    const updatedUser: IUser = {
      name: name || user.name,
      email: email || user.email,
      password: password ? password.trim() : user.password,
    };

    await updateUser(updatedUser, id, ipAddress);

    const responseUser: Partial<IUser> = { ...updatedUser };
    delete responseUser.password;

    res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      data: responseUser,
    });
  } catch (err) {
    console.error('Erro ao tentar atualizar conta:', err);
    res.status(500).json({ msgError: 'Erro interno ao tentar atualizar conta.' });
  }
};

export default updateController;
