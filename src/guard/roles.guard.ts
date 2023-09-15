/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService : UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const roles = this.reflector.get<string[]>('roles', 
      context.getHandler(),
    );
    if (!roles || roles.length === 0) {
      return true; // no specific role required , allowed access
    }

    const request = context.switchToHttp().getRequest();
    if(request.user){

      const userInfo = await this.userService.findUserByUserName(request.user.username);
      return roles.includes(userInfo.role);
    }
    return false;
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
