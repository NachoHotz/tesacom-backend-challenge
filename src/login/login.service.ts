import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import User from 'src/users/user.entity';
import ValidateUserDto from './dto/ValidateUserParamsDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Returns a JWT by validating a user by calling the getValidatedUser service, passing the following parmeters:
   *
   * If there is an error with the request, the information about the error will be displayed in the console.
   *
   * @param userCredentials: ValidateUserDto - the user´s credentials to validate: email, and password.
   *
   * If the user is not found, it will return an error of type UnauthorizedException with more information.
   *
   * Else, if the given password, is not the same as the one stored in the database, it will return an error of type UnauthorizedException.
   *
   * @returns string - The Json Web Token related to that validated user by calling the signUser service.
   */
  async validateUser(
    userCredentials: ValidateUserDto,
  ): Promise<Error | User | unknown> {
    const user = await this.usersService.getValidatedUser(userCredentials);

    if (!user) {
      return new UnauthorizedException('Incorrect credentials');
    }

    if (!(await bcrypt.compare(userCredentials.password, user.password))) {
      return new UnauthorizedException('incorrect credentials');
    }

    return this.signUser(userCredentials.email, user.name, 'SINGLE');
  }

  signUser(userEmail: string, name: string, type: string) {
    return this.jwtService.sign({
      sub: name,
      userEmail,
      claim: type,
    });
  }
}
