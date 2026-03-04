import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AssetPublicAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const query = request.query;

    const allowedStatus = ['upcoming', 'active', 'completed'];

    // Nếu không truyền status => cho phép (sẽ lọc sau trong service)
    if (!query.status) return true;

    const status = query.status as string;

    if (!allowedStatus.includes(status)) {
      throw new ForbiddenException(
        `Trạng thái "${status}" không được phép truy cập công khai`,
      );
    }

    return true;
  }
}
