import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export default class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  serial: string;

  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  created: string;
}
