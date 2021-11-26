import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Devices from './devices.entity';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';
import { successHandler } from 'src/helpers/handlers';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>
  ) {}

  async getDevices(): Promise<{} | Devices[]> {
    try {
      const devices = await this.devicesRepository.find();

      if (!devices || devices.length === 0) {
        return new NotFoundException('no devices found');
      }

      return successHandler(true, 200, 'Found', devices);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueDevice(deviceId: string): Promise<{}> {
    try {
      const uniqueDevice = await this.devicesRepository.findOne(deviceId);

      if (!uniqueDevice) {
        return new NotFoundException('no device found with that serial number');
      }

      return successHandler(true, 200, 'Device found', uniqueDevice);
    } catch (e) {
      return new Error(e);
    }
  }

  async createDevice(newDeviceBody: CreateDeviceDto): Promise<{}> {
    try {
      const newDevice = await this.devicesRepository.create(newDeviceBody);

      await this.devicesRepository.save(newDevice);

      return successHandler(true, 200, 'Device created successfully', newDevice)
    } catch (e) {
      return new Error(e);
    }
  }

  async updateDevice(updateDeviceBody: UpdateDeviceDto, deviceId: string): Promise<{}> {
    try {
      await this.devicesRepository.update(deviceId, updateDeviceBody);

      return successHandler(true, 200, 'device updated successfully');
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteDevice(deviceId: string): Promise<{}> {
    try {
      await this.devicesRepository.delete(deviceId);

      return successHandler(true, 200, 'device deleted successfully');
    } catch (e) {
      return new Error(e);
    }
  }
}
