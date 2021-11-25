import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':email')
  async getUniqueUser(@Param('email') email: string) {
    return await this.usersService.getUniqueUser(email);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.usersService.createUser(newUser);
  }

  @Put(':userEmail')
  async updateUser(@Param('userEmail') userEmail: string, @Body() updatedUserBody: UpdateUserDto) {
    return await this.usersService.updateUser(userEmail, updatedUserBody);
  }

  @Delete(':userEmail')
  async deleteUser(@Param('userEmail') userEmail: string)  {
    return await this.usersService.deleteUser(userEmail);
  }
}
