import { Request, Response } from 'express';
import { setToken } from '../security/token';
import { authUserLogin, getUserByEmail } from '../models/userModel';
import bcrypt from 'bcrypt';

const loginController = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    const userDb = await getUserByEmail(email);

    if (!userDb || !bcrypt.compareSync(password, userDb.password)) {
      return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
    }

    if (!userDb.auth_status) {
      return res.status(401).json({ error: 'Falha ao efetuar login. Conta não autorizada.' });
    }

    const userValidaty = await authUserLogin({
      email: email,
      password: userDb.password,
    });

    if (!userValidaty) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = await setToken({
      id: userValidaty.id,
      name: userValidaty.name,
      email,
    });

    res.status(200).json({ email, auth: true, token });

  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Erro ao tentar efetuar o login.' });
  }
};

export default loginController;
