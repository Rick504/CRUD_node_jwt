import { Request, Response } from 'express';

export const homeController = async (req: Request, res: Response) => {
  return res.json({ mensagem: 'Aplicação no Ar!' })
};

