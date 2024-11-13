import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Routers
import appRouter from './routers/index';
import userRouter from './routers/userRouter';

dotenv.config();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  next();
});

app.use(appRouter);
app.use(userRouter);

app.use(
  cors({
    origin: 'http://localhost:5173', // Permite apenas o acesso da origem http://localhost:5173
  })
);

app.listen(process.env.PORT, () => {
  console.log(
    `O aplicativo está sendo executado na porta ${process.env.PORT} !`
  );
});
