import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtConstants } from './jwt.constants';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { User } from '../../modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT Payload:', payload);
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    console.log('Found user:', user);

    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      verified: user.verified,
      status: user.status,
    };
  }
}
