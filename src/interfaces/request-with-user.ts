import { Request } from 'express';
import { GoogleUserDto } from '../auth/dto/google-user.dto';

export interface RequestWithUser extends Request {
  user: GoogleUserDto;
}
