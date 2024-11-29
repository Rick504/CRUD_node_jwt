import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeJobs } from './job';

import appRouter from './routers/index';
import userRouter from './routers/userRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: `http://localhost:${process.env.CLIENT_PORT || 3000}` }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.CLIENT_PORT || 3000}`);
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
    console.log('Aplicação inicializada com sucesso!');
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

async function startServer() {
  await bootstrap();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`O aplicativo está sendo executado na porta ${PORT}!`);
  });
}

startServer();
