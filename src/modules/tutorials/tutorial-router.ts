import express from 'express';
import { validate, validateParams } from '../../middleware/request-validator';
import { createTutorialSchema, getTutorialSchema } from './schemas';
import { getTutorial, postTutorial, getAllTutorials } from './tutorial-controller';

const router = express.Router();

router.post('/', validate(createTutorialSchema), postTutorial);
router.get('/', getAllTutorials);
router.get('/:id', validateParams(getTutorialSchema), getTutorial);

export { router };
