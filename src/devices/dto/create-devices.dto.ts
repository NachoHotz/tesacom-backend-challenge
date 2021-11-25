import { IsString, IsNumber } from 'class-validator';

export default class CreateDeviceDto {
  @IsString()
  serial: string;

  @IsString()
  alias: string;

  @IsString()
  model: string;

  @IsNumber()
  code: number;

  @IsString()
  created: string;
}
