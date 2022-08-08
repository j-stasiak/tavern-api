import { complete, getAllTutorials, getTutorial, postTutorial } from './tutorial-controller';
import { createTutorialSchema, getTutorialSchema } from './schemas';
import { validate, validateParams } from '../../middleware/request-validator';

import express from 'express';

const router = express.Router();

router.post('/', validate(createTutorialSchema), postTutorial);
router.get('/', getAllTutorials);
router.get('/:id', validateParams(getTutorialSchema), getTutorial);
router.post('/:id/complete', complete);

export { router };
