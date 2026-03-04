export interface JwtPayload {
  sub: number;
  jti: string;
  username?: string;
  role?: string;
  // email?: string;
  // iat?: number;
  // exp?: number;
}
