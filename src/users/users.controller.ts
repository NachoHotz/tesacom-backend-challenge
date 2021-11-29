import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import ValidateUserParamsDto from './dto/validate-params.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  async getUniqueUser(@Param() email: ValidateUserParamsDto) {
    return await this.usersService.getUniqueUser(email);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.usersService.createUser(newUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':email')
  async updateUser(
    @Param() email: ValidateUserParamsDto,
    @Body() updatedUserBody: UpdateUserDto,
  ) {
    if (updatedUserBody.password) {
      updatedUserBody.password = await bcrypt.hash(
        updatedUserBody.password,
        12,
      );
    }
    return await this.usersService.updateUser(email, updatedUserBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':email')
  async deleteUser(@Param() email: ValidateUserParamsDto) {
    return await this.usersService.deleteUser(email);
  }
}
