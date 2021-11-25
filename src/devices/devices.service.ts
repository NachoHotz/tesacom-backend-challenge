import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Devices from './devices.entity';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>
  ) {}

  getDevices() {
    return this.devicesRepository.find();
  }

  getUniqueDevice(deviceId: number) {
    return this.devicesRepository.findOne(deviceId);
  }

  createDevice(newDevice: CreateDeviceDto) {
    return this.devicesRepository.create(newDevice);
  }

  updateDevice(newDevice: UpdateDeviceDto, deviceId: number) {
    return this.devicesRepository.update(deviceId, newDevice);
  }
}
