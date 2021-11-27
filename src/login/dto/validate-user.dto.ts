import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export default class ValidateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
