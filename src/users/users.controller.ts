import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UsersService } from './users.service';

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
  async getUniqueUser(@Param('email') email: string) {
    return await this.usersService.getUniqueUser(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.usersService.createUser(newUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':userEmail')
  async updateUser(@Param('userEmail') userEmail: string, @Body() updatedUserBody: UpdateUserDto) {
    return await this.usersService.updateUser(userEmail, updatedUserBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userEmail')
  async deleteUser(@Param('userEmail') userEmail: string)  {
    return await this.usersService.deleteUser(userEmail);
  }
}
