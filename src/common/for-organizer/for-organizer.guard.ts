import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from '../../auth/dto/register.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ForOrganizerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user is authenticated and has the 'organizer' role
    if (user && user.role !== UserRole.ORGANIZER) {
      return false; // Allow access for organizers
    }

    return true; // This guard allows all requests to pass through.
  }
}
