import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { successHandler } from 'src/helpers/successHandler';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import ValidateUserDto from 'src/login/dto/validate-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<{}> {
    try {
      const users = await this.usersRepository.find();

      if (!users || users.length === 0) {
        return new NotFoundException('No users found');
      }

      return successHandler(true, 201, 'found', users);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueUser(id: string): Promise<{}> {
    try {
      const uniqueUser = await this.usersRepository.findOne(id);

      if (!uniqueUser) {
        return new NotFoundException('No user found wth that email');
      }

      return successHandler(true, 201, 'Found', uniqueUser);
    } catch (e) {
      return new Error(e);
    }
  }

  async getValidatedUser(userCredentials: ValidateUserDto): Promise<User> {
    try {
      const userValidated = await this.usersRepository.findOne(
        userCredentials.email,
      );
      return userValidated;
    } catch (e) {
      console.log(e);
    }
  }

  async createUser(newUserBody: CreateUserDto): Promise<{}> {
    try {
      const userExists = await this.usersRepository.findOne(newUserBody.email);

      if (userExists) {
        return new BadRequestException('User already registered with that email');
      }

      const newUser = await this.usersRepository.create(newUserBody);
      const savedUser = await this.usersRepository.save(newUser);

      return successHandler(true, 200, 'User created successfully', savedUser);
    } catch (e) {
      return new Error(e);
    }
  }

  async updateUser(
    userId: string,
    updatedUserBody: UpdateUserDto,
  ): Promise<{}> {
    try {
      const userExists = await this.usersRepository.findOne(userId);

      if (!userExists) {
        return new BadRequestException('No user registered with that email');
      }

      await this.usersRepository.update(userId, updatedUserBody);

      const updatedUser = await this.usersRepository.findOne(userId);

      return successHandler(true, 200, 'User updated successfully', updatedUser);
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteUser(userId: string): Promise<{}> {
    try {
      const userExists = await this.usersRepository.findOne(userId);

      if (!userExists) {
        return new BadRequestException( 'User doesn´t exists or has already been deleted');
      }

      await this.usersRepository.delete(userId);

      return successHandler(true, 200, 'User deleted successfully');
    } catch (e) {
      return new Error(e);
    }
  }
}
