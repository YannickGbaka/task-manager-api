import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,

    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async login(authUserDto: AuthUserDto) {
    try {
      const user = await this.userService.findByEmail(authUserDto.email);
      if (!user) {
        throw new UnauthorizedException(
          `The email ${authUserDto.email} is unknown`,
        );
      }

      //check the provided password
      const isPasswordValid = await this.hashingProvider.comparePassword(
        authUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('The provided password is incorrect');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload, {
        secret: this.authConf.secret, // call the secret from the conf file which calls the .env
        expiresIn: this.authConf.expiresIn, //
        audience: this.authConf.audience,
        issuer: this.authConf.issuer,
      });

      return {
        token,
      };
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Something unexpected happened, please try again later',
      );
    }
  }
}
