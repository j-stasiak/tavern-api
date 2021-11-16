import 'reflect-metadata';
import express from 'express';
import { router as userRouter } from './modules/user';
import { router as authRouter } from './modules/auth';
import { checkJwt } from './middleware/check-jwt';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.get('/xd', checkJwt, (req, res) => {
  res.send(`Jwt is working! ${req.user?.username}`);
});

export { app };
