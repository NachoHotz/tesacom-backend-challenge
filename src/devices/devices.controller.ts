import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import {DevicesService} from './devices.service';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getDevices() {
    return await this.devicesService.getDevices();
  }

  @Get(':deviceId')
  async getUniqueDevice(@Param('deviceId') deviceId: string) {
    return await this.devicesService.getUniqueDevice(deviceId);
  }

  @Post()
  createDevice(@Body() newDevice: CreateDeviceDto) {
    return this.devicesService.createDevice(newDevice)
  }

  @Put(':deviceId')
  updateDevice(@Body() updatedDevice: UpdateDeviceDto, @Param('deviceId') deviceId: string) {
    return this.devicesService.updateDevice(updatedDevice, deviceId)
  }

  @Delete(':deviceId')
  deleteDevice(@Param('deviceId') deviceId: string) {
    return this.devicesService.deleteDevice(deviceId)
  }
}
