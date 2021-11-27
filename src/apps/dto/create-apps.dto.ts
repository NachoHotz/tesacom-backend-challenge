import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export default class CreateAppsDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  created: string;
}
