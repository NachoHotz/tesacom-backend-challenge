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
import ValidateUserParamsDto from './dto/validate-params.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

/**
 Returns all of the users from the database.

 If there are no users found, it returns an error of type NotFoundException.

 @return object - an object with the following properties:
 - success: boolean - true
 - code: number - 200
 - message: string - found
 - data: array of Users
*/
  async getUsers(): Promise<object | Error> {
    try {
      const users = await this.usersRepository.find();

      if (!users || users.length === 0) {
        return new NotFoundException('No users found');
      }

      return successHandler(true, 200, 'found', users);
    } catch (e) {
      return new Error(e);
    }
  }

/**
 * Returns an unique user from the database.
 *
 * If there is no user found, it returns an error of type NotFoundException.
 *
 *@param id string - the user id to search. The id is the email of the user.

  @returns object - an object with the following properties:
  - success: boolean - true
  - code: number - 200
  - message: string - found
  - data: object - unique User object
*/
  async getUniqueUser(userId: ValidateUserParamsDto): Promise<object | Error> {
    try {
      const uniqueUser = await this.usersRepository.findOne(userId);

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

  /**
   * Creates a new instance of a user in the database.
   *
   * @param CreateUserDto - newUserBody - an object containing of all the user infomrmation for its creation.
   * It has the following properties:
   * - name: string - first name of the user
   * - lastname: string
   * - email: string
   * - password: string - the password is hashed before being inserted in the database.
   * - created: date
   *
   * All of the user properties are validated before being created.
   *
   * If one of the properties is not valid, it will return an Error object with information of why the property is not valid.
   *
   * If there is a property that is not present in the CreateUserDto, it will be ignored by this method, and not inserted into the new User instance.
   *
   * @returns Error - if there is a user in the database with the same email as the one to be created, it will return an error of type BadRequestException
   * @returns object - if the request is successful, it will return an object with the following properties:
   * - success: boolean - true
   * - code: number - 201
   * - message: string - user created successfully
   * - data: object - the new created user
  */
  async createUser(newUserBody: CreateUserDto): Promise<object | Error> {
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
    userId: ValidateUserParamsDto,
    updatedUserBody: UpdateUserDto,
  ): Promise<object | Error> {
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

  async deleteUser(userId: ValidateUserParamsDto): Promise<object | Error> {
    try {
      const userExists = await this.usersRepository.findOne(userId);

      if (!userExists) {
        return new BadRequestException( 'User doesn´t exists or has already been deleted');
      }

      await this.usersRepository.delete(userId);

      return successHandler(true, 200, 'User deleted successfully', userExists);
    } catch (e) {
      return new Error(e);
    }
  }
}
