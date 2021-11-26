import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import LoginController from './login.controller';
import JwtStrategy from './strategy/jwt.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('jwtSecret')
    }),
    inject: [ConfigService],
  })],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService]
})
export class LoginModule {}
