import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { router as userRouter } from './modules/user';
import { router as authRouter } from './modules/auth';
import { router as tutorialsRouter } from './modules/tutorials';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/tutorial', tutorialsRouter);

export { app };
