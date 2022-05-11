import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import ValidateUserDto from './dto/validate-user.dto';

@Controller('login')
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async validate(@Body() userCredentials: ValidateUserDto) {
    return await this.loginService.validateUser(userCredentials);
  }
}
