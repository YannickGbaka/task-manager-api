import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    //retrieve the token
    const token = this.extractHeaderFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('The provided token is invalid');
    }
    //validate the token
    try {
      const payload = await this.jwtService.verify(token, this.authConf);
      request['user'] = payload;
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractHeaderFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
