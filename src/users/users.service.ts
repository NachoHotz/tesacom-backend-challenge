import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SuccessHandler from 'src/helpers/successHandler';
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
 Returns all instances of a user from the database.

 If there is an error with the request, it will return an error of type Error with more information.

 If there are no users found, it returns an error of type NotFoundException with more information.

 @return object - an object return by the SuccessHandler class when the request is successfull. Check this class to learn more.
*/
  async getUsers(): Promise<object | Error> {
    try {
      const users = await this.usersRepository.find();

      if (!users || users.length === 0) {
        return new NotFoundException('No users found');
      }

      return new SuccessHandler(true, 200, 'Users found', users);
    } catch (e) {
      return new Error(e);
    }
  }

/**
 * Returns an unique user from the database.
 *
 * If there is a error with the request, it will return an error of type Error with more information.
 *
 * If there is no user found, it returns an error of type NotFoundException with more information.
 *
 *@param userId: ValidateUserParamsDto - string - the user id to search. The id is the email of the user.

  @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more.
*/
  async getUniqueUser(userId: ValidateUserParamsDto): Promise<object | Error> {
    try {
      const uniqueUser = await this.usersRepository.findOne(userId);

      if (!uniqueUser) {
        return new NotFoundException(`No user found with email ${userId.email}`);
      }

      return new SuccessHandler(true, 200, 'User found', uniqueUser);
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
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * @param newUserBody: CreateUserDto - an object containing of all the user infomrmation for its creation.
   *
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
   * @returns Error - if there is a user in the database with the same email as the one to be created, it will return an error of type BadRequestException with more information.
   * @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more
  */
  async createUser(newUserBody: CreateUserDto): Promise<object | Error> {
    try {
      const userExists = await this.usersRepository.findOne(newUserBody.email);

      if (userExists) {
        return new BadRequestException(`User already registered with email ${newUserBody.email}`);
      }

      const newUser = await this.usersRepository.create(newUserBody);
      const savedUser = await this.usersRepository.save(newUser);

      return new SuccessHandler(true, 201, 'User created successfully', savedUser);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Updates an instance of a User in the database
   *
   * If there is an error with the request, it return an error of type Error with more information.
   *
   * @param userId: ValidateUserParamsDto - the id of the user to update. The id is the email of the user
   *
   * If a user is not found with that id, it will return an error of type BadRequestException with more information.
   *
   * @param updatedUserBody: UpdateUserDto - the object with the properties to update with the new information
   *
   * @returns object - an object which is returned by the SuccessHandler class if the request is successfull. Check this class to learn more.
  */
  async updateUser(
    userId: ValidateUserParamsDto,
    updatedUserBody: UpdateUserDto,
  ): Promise<object | Error> {
    try {
      const userExists = await this.usersRepository.findOne(userId);

      if (!userExists) {
        return new BadRequestException(`No user registered with email ${userId.email}`);
      }

      await this.usersRepository.update(userId, updatedUserBody);

      const updatedUser = await this.usersRepository.findOne(userId);

      return new SuccessHandler(true, 200, 'User updated successfully', updatedUser);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Delete an instance of a User from the database
   *
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * @param userId: ValidateUserParamsDto - string - the id of the user to delete. It is the email of the user
   *
   * If a user is not found with that email, it returns an error of type BadRequestException with more information.
   *
   * @returns object - an object which is returned by the SuccessHandler class when the request is successfull. Check this class to learn more.
  */
  async deleteUser(userId: ValidateUserParamsDto): Promise<object | Error> {
    try {
      const userExists = await this.usersRepository.findOne(userId);

      if (!userExists) {
        return new BadRequestException('User doesn´t exists or has already been deleted');
      }

      await this.usersRepository.delete(userId);

      return new SuccessHandler(true, 200, 'User deleted successfully', userExists);
    } catch (e) {
      return new Error(e);
    }
  }
}
