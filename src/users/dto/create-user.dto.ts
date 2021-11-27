import { IsString, IsDate, IsEmail } from 'class-validator';

export default class CreateUserDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  created: string;
}
