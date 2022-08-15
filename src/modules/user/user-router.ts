import { deleteUser, getAllUsers, getUser, patchUser } from './user-controller';

import { UserRoles } from './entities';
import express from 'express';
import { roleRestrictedRoute } from '../../middleware/role-restricted-route';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', roleRestrictedRoute(UserRoles.MODERATOR), patchUser);
router.delete('/:id', roleRestrictedRoute(UserRoles.ADMIN), deleteUser);

export { router };
