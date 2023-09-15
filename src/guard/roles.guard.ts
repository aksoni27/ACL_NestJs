import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

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