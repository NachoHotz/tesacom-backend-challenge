import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import LoginController from './login.controller';
import JwtStrategy from './strategy/jwt.strategy';

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
