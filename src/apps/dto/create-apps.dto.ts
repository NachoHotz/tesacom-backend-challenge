import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateAppsDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  url: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  created: string;
}
