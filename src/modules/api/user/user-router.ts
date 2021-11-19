import express from 'express';
// import { validate } from '../../middleware/request-validator';
// import { createUserSchema } from './schemas';

const router = express.Router();

// router.post('/', validate(createUserSchema), (req, res) => {
//   res.send('User created');
// });

export { router };
