import jwt from 'jsonwebtoken';

export async function setToken(userDataJWT: any) {
  const jwtSecret = process.env.JWT_SECRET as string;
  try {
    const token = await jwt.sign({ userDataJWT }, jwtSecret, {
      expiresIn: '30m',
    });
    return token;
  } catch (err) {
    return { msgError: 'Erro ao gerar token.' };
  }
}
