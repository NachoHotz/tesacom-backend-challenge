import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import ValidateUserDto from './dto/validate-user.dto';

@Injectable()
export class LoginService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userCredentials: ValidateUserDto): Promise<Error | User | {}> {
    const user = await this.usersService.getValidatedUser(userCredentials);

    if (!user) {
      return new UnauthorizedException('Incorrect credentials');
    }

    if (!await bcrypt.compare(userCredentials.password, user.password)) {
      return new UnauthorizedException('incorrect credentials');
    }

    return this.signUser(userCredentials.email, user.name, 'SINGLE');
  }

  signUser(userEmail: string, name: string, type: string) {
    return this.jwtService.sign({
      sub: name,
      userEmail,
      claim: type
    });
  }
}
