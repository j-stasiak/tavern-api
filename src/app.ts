import 'reflect-metadata';
import express from 'express';
import { router as userRouter } from './modules/user';
import { router as authRouter } from './modules/auth';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/user', userRouter);
app.use('/auth', authRouter);

export { app };
