import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';
import LoginController from './login.controller';
import JwtStrategy from './strategy/jwt.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
  })],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService]
})
export class LoginModule {}
