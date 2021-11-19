import 'reflect-metadata';
import expressWs from 'express-ws';
import express from 'express';
import { router as userRouter } from './modules/api/user';
import { router as authRouter } from './modules/api/auth';

const app = expressWs(express()).app;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/user', userRouter);
app.use('/auth', authRouter);

export { app };
