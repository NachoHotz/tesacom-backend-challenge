import { IsEmail } from 'class-validator';

export default class ValidateUserParamsDto {
  @IsEmail()
  email: string
}
