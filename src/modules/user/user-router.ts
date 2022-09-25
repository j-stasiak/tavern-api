import { deleteUser, getAllUsers, getUser, getUserChatHistory, patchUser } from './user-controller';

import { UserRoles } from './entities';
import express from 'express';
import { roleRestrictedRoute } from '../../middleware/role-restricted-route';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/:id/chat', getUserChatHistory);
router.patch('/:id', roleRestrictedRoute(UserRoles.MODERATOR), patchUser);
router.delete('/:id', roleRestrictedRoute(UserRoles.ADMIN), deleteUser);

export { router };
