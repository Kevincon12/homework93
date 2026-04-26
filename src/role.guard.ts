import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { UserDocument } from './shemas/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: UserDocument }>();

    const user = request.user;

    if (!user) {
      return false;
    }

    return user.role === requiredRole;
  }
}