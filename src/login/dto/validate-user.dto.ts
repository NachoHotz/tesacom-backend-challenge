import { IsEmail, IsString } from 'class-validator';

export default class ValidateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
