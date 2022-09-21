import { complete, getAllTutorials, getTutorial, patchTutorial, postTutorial } from './tutorial-controller';
import { createTutorialSchema, getTutorialSchema } from './schemas';
import { validate, validateParams } from '../../middleware/request-validator';

import { UserRoles } from '../user/entities';
import express from 'express';
import { roleRestrictedRoute } from '../../middleware/role-restricted-route';

const router = express.Router();

router.post('/', validate(createTutorialSchema), roleRestrictedRoute(UserRoles.ADMIN), postTutorial);
router.get('/', getAllTutorials);
router.patch('/:id', roleRestrictedRoute(UserRoles.ADMIN), patchTutorial);
router.get('/:id', validateParams(getTutorialSchema), getTutorial);
router.post('/:id/complete', complete);

export { router };
