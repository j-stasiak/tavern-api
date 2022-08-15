import type { NextFunction, Request, Response } from 'express';

import { UserRoles } from '../modules/user/entities';

export const roleRestrictedRoute =
  (requiredRole: UserRoles) => async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Permission levels probably shouldn't be hard coded here.
    const permissionLevel = {
      [UserRoles.USER]: 1,
      [UserRoles.MODERATOR]: 2,
      [UserRoles.ADMIN]: 3
    } as const;

    const userRole = req.user!.role as UserRoles;

    if (permissionLevel[userRole] >= permissionLevel[requiredRole]) {
      next();
    }

    res.status(403).send({ message: "You don't have a permission to access this resource!" });
    return;
  };
