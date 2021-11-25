import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import {DevicesService} from './devices.service';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  getDevices() {
    this.devicesService.getDevices();
  }

  @Get(':deviceId')
  getUniqueDevice(@Param('deviceId') deviceId: string) {
    return this.devicesService.getUniqueDevice(parseInt(deviceId));
  }

  @Post()
  createDevice(@Body() newDevice: CreateDeviceDto) {
    return this.devicesService.createDevice(newDevice)
  }

  @Put(':deviceId')
  updateDevice(@Body() updatedDevice: UpdateDeviceDto, @Param('deviceId') deviceId: string) {
    return this.devicesService.updateDevice(updatedDevice, parseInt(deviceId))
  }

}
