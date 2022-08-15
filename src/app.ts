import 'reflect-metadata';

import { router as authRouter } from './modules/auth';
import { checkJwtMiddleware as checkJwt } from './middleware/check-jwt';
import cors from 'cors';
import express from 'express';
import { router as tutorialsRouter } from './modules/tutorials';
import { router as userRouter } from './modules/user';

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/auth', authRouter);
app.use('/user', checkJwt, userRouter);
app.use('/tutorial', checkJwt, tutorialsRouter);

export { app };
