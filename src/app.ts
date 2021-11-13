import 'reflect-metadata';
import express from 'express';
import { router as userRouter } from './modules/user';

const app = express();

app.use('/user', userRouter);

export { app };
