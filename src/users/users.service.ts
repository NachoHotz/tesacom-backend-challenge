import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorHandler, successHandler } from 'src/helpers/handlers';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<{} | User[]> {
    const users = await this.usersRepository.find();

    if (!users || users.length === 0) {
      return errorHandler(false, 404, 'No users found');
    }

    return successHandler(true, 200, 'Found', users);
  }

  async getUniqueUser(id: string) {
    try {
      const uniqueUser = await this.usersRepository.findOne(id);

      return successHandler(true, 200, 'Found', uniqueUser);
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async createUser(newUserBody: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(newUserBody);
      await this.usersRepository.save(newUser);

      return successHandler(true, 200, 'User created successfully', newUser);
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async updateUser(userId: string, updatedUserBody: UpdateUserDto) {
    try {
      await this.usersRepository.update(userId, updatedUserBody)

      return successHandler(true, 200, 'User updated successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.usersRepository.delete(userId);

      return successHandler(true, 200, 'User deleted successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }
}
