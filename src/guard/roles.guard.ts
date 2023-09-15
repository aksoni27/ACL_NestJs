/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorator/roles.decorator';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(Roles);

    const roles = this.reflector.get(Roles, 
      context.getHandler(),
    );

    if (!roles || roles.length === 0) {
      return true; // no specific role required , allowed access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false; // unauthorized
    }
    return this.matchRoles(user.role, roles);
  }

  matchRoles(userRole, roles): boolean {
    if (userRole === 'admin') {
      return true;
    } else if (userRole === 'seller') {
      return (
        roles.includes['fetch'] ||
        roles.includes['create'] ||
        roles.includes['update']
      );
    } else if (userRole === 'customer') {
      return roles.includes['fetch'];
    } else if (userRole === 'supporter') {
      return roles.includes['fetch'] || roles.includes['delete'];
    }
    return false;
  }
}
