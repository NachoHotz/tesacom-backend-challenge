import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Devices from './devices.entity';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';
import { errorHandler, successHandler } from 'src/helpers/handlers';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>
  ) {}

  async getDevices() {
    try {
      const devices = await this.devicesRepository.find();

      if (!devices || devices.length === 0) {
        return errorHandler(false, 404, 'No devices found');
      }

      return successHandler(true, 200, 'Found', devices);
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async getUniqueDevice(deviceId: string) {
    try {
      const uniqueDevice = await this.devicesRepository.findOne(deviceId);

      if (!uniqueDevice) {
        return errorHandler(false, 404, 'No device found with that id')
      }

      return successHandler(true, 200, 'Device found', uniqueDevice);

    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async createDevice(newDeviceBody: CreateDeviceDto) {
    try {
      const newDevice = await this.devicesRepository.create(newDeviceBody);

      await this.devicesRepository.save(newDevice);

      return successHandler(true, 200, 'Device created successfully', newDevice)
    } catch (e) {
      return {
        success: false,
        code: 500,
        error: e
      }
    }
  }

  async updateDevice(updateDeviceBody: UpdateDeviceDto, deviceId: string) {
    try {
      await this.devicesRepository.update(deviceId, updateDeviceBody);

      return successHandler(true, 200, 'device updated successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }

  async deleteDevice(deviceId: string) {
    try {
      await this.devicesRepository.delete(deviceId);

      return successHandler(true, 200, 'device deleted successfully');
    } catch (e) {
      return errorHandler(false, 500, e);
    }
  }
}
