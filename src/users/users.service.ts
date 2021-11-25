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

  async getUsers(): Promise<{}> {
    const users = await this.usersRepository.find();

    if (!users || users.length === 0) {
      return errorHandler(false, 404, 'No users found');
    }

    return successHandler(true, 200, 'Found', users);
  }

  async getUniqueUser(id: string): Promise<{}> {
    try {
      const uniqueUser = await this.usersRepository.findOne(id);

      if (!uniqueUser) {
        return errorHandler(false, 404, 'No user found with that id');
      }

      return successHandler(true, 200, 'Found', uniqueUser);
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async createUser(newUserBody: CreateUserDto): Promise<{}> {
    try {
      const newUser = await this.usersRepository.create(newUserBody);
      await this.usersRepository.save(newUser);

      return successHandler(true, 200, 'User created successfully', newUser);
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async updateUser(userId: string, updatedUserBody: UpdateUserDto): Promise<{}> {
    try {
      await this.usersRepository.update(userId, updatedUserBody)

      return successHandler(true, 200, 'User updated successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async deleteUser(userId: string): Promise<{}> {
    try {
      await this.usersRepository.delete(userId);

      return successHandler(true, 200, 'User deleted successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }
}
