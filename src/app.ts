import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { router as userRouter } from './modules/user';
import { router as authRouter } from './modules/auth';
import { router as tutorialsRouter } from './modules/tutorials';
import { checkJwtMiddleware } from './middleware/check-jwt';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/auth', authRouter);
app.use('/user', checkJwtMiddleware, userRouter);
app.use('/tutorial', checkJwtMiddleware, tutorialsRouter);

export { app };
