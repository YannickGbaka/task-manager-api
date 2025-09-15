import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './hashing.provider';
import { BcryptHashingProvider } from './bcrypt-hashing.provider';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  providers: [
    AuthService,
    BcryptHashingProvider,
    {
      provide: HashingProvider,
      useClass: BcryptHashingProvider,
    },
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
