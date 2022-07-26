import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevicesService } from './devices.service';
import CreateDeviceDto from './dto/CreateDeviceDto.dto';
import UpdateDeviceDto from './dto/UpdateDeviceDto.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getDevices() {
    return this.devicesService.getDevices();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':deviceId')
  async getUniqueDevice(@Param('deviceId') deviceId: string) {
    return this.devicesService.getUniqueDevice(deviceId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createDevice(@Body() newDevice: CreateDeviceDto) {
    return this.devicesService.createDevice(newDevice);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':deviceId')
  async updateDevice(
    @Body() updatedDevice: UpdateDeviceDto,
    @Param('deviceId') deviceId: string,
  ) {
    return this.devicesService.updateDevice(updatedDevice, deviceId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':deviceId')
  async deleteDevice(@Param('deviceId') deviceId: string) {
    return this.devicesService.deleteDevice(deviceId);
  }
}
