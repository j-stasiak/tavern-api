import express from 'express';
import { roleRestrictedRoute } from '../../middleware/role-restricted-route';
import { UserRoles } from '../user/entities';
import { deleteChatMessage, getChatHistory } from './chat-controller';

const router = express.Router();

router.get('/', getChatHistory);
router.delete('/:id', roleRestrictedRoute(UserRoles.MODERATOR), deleteChatMessage);

export { router };
