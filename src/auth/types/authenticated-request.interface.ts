// src/auth/types/authenticated-request.interface.ts
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
  };
}
