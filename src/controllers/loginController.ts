import { Request, Response } from 'express';
import { setToken } from '../security/token';
import { authUserLogin, getUserByEmail } from '../models/userModel';
import bcrypt from 'bcrypt';

const loginController = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    const textPassword = password;
    const hashPasswordDb = await getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(textPassword, hashPasswordDb.password);

    if (isValidPassword) {
       const userValidaty = await authUserLogin({
          email: email,
          password: hashPasswordDb.password,
        });

        if (!userValidaty) {
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = await setToken({
          id: userValidaty.id,
          name: userValidaty.name,
          email
        });

        res.status(200).json({ email, auth: true, token });
    } else {
      res.status(401).json('Usuario e senha incorretos.');
    }
  } catch (err) {
    res.status(403).json('Erro ao tentar efetuar o login.');
  }
};
export default loginController;
