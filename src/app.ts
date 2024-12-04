import { config } from '../config';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeJobs } from './job';

import appRouter from './routers/index';
import userRouter from './routers/userRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: `http://localhost:${config.port}` }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.port}`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  next();
});

app.use(appRouter);
app.use(userRouter);

export async function bootstrap() {
  try {
    initializeJobs();
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

async function startServer() {
  await bootstrap();

  app.listen(config.port, () => {
   console.log(`
    ========================================
      🚀 Aplicativo em execução com sucesso!
    ========================================

      🌐 Acesse em: http://localhost:${config.port}

    `);
  });
}

startServer();
