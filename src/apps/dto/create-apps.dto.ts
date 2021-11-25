import { IsString } from "class-validator";

export default class CreateAppsDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  icon: string;

  @IsString()
  created: string;
}
