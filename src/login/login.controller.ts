import { Controller, Post, Body } from "@nestjs/common";
import ValidateUserDto from "./dto/validate-user.dto";
import { LoginService } from "./login.service";

@Controller('login')
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async validate(@Body() userCredentials: ValidateUserDto) {
    return await this.loginService.validateUser(userCredentials);
  }

}
