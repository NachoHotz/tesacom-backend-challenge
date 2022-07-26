import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import ValidateUserDto from './dto/ValidateUserParamsDto.dto';

@Controller('login')
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async validate(@Body() userCredentials: ValidateUserDto) {
    return this.loginService.validateUser(userCredentials);
  }
}
