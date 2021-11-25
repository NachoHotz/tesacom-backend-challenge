import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      return {
        sucess: false,
        code: 404,
        error: 'No users found',
      };
    }

    return users;
  }

  async getUniqueUser(id: string) {
    try {
      const uniqueUser = await this.usersRepository.findOne(id);

      return uniqueUser;
    } catch (e) {
      return {
        sucess: false,
        code: 500,
        error: e,
      };
    }
  }

  async createUser(newUser: CreateUserDto) {
    try {
      const createdUser = await this.usersRepository.create(newUser);
      await this.usersRepository.save(createdUser);

      return {
        success: true,
        message: 'creted successfully',
        createdUser: createdUser,
      };
    } catch (e) {
      return {
        success: false,
        code: 500,
        error: e,
      };
    }
  }

  async updateUser(userId: string, updatedUserBody: UpdateUserDto) {
    try {
      await this.usersRepository.update(userId, updatedUserBody)

      return {
        success: true,
        code: 200,
        message: 'User updated successfully'
      }

    } catch (e) {
      return {
        success: false,
        code: 500,
        error: e
      }
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.usersRepository.delete(userId);

      return {
        success: true,
        code: 200,
        message: 'User deleted successfully'
      }
    } catch (e) {
      return {
        success: false,
        code: 500,
        error: e
      }
    }
  }
}
