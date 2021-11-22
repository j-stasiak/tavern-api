import express from 'express';
// import { validate } from '../../middleware/request-validator';
// import { createUserSchema } from './schemas';

const router = express.Router();

router.get('/user', (req, res) => {
  res.send('User returned');
});

export { router };
