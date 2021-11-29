import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { successHandler } from 'src/helpers/successHandler';
import Devices from './devices.entity';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>,
  ) {}

  async getDevices(): Promise<Error | object> {
    try {
      const devices = await this.devicesRepository.find();

      if (!devices || devices.length === 0) {
        return new NotFoundException('No devices found');
      }

      return successHandler(true, 200, 'Devices found', devices);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueDevice(deviceId: string): Promise<Error | object> {
    try {
      const uniqueDevice = await this.devicesRepository.findOne(deviceId);

      if (!uniqueDevice) {
        return new NotFoundException(`No device found with serial number ${deviceId}`);
      }

      return successHandler(true, 200, 'Device found', uniqueDevice);
    } catch (e) {
      return new Error(e);
    }
  }

  async createDevice(newDeviceBody: CreateDeviceDto): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne( newDeviceBody.serial);

      if (deviceExists) {
        return new BadRequestException(`Device already registered with serial number ${newDeviceBody.serial}`);
      }

      const newDevice = await this.devicesRepository.create(newDeviceBody);

      await this.devicesRepository.save(newDevice);

      return successHandler( true, 200, 'Device created successfully', newDevice);
    } catch (e) {
      return new Error(e);
    }
  }

  async updateDevice(
    updateDeviceBody: UpdateDeviceDto,
    deviceId: string,
  ): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne(deviceId);

      if (!deviceExists) {
        return new BadRequestException(`No device found with serial number ${deviceId} to edit`);
      }

      await this.devicesRepository.update(deviceId, updateDeviceBody);

      return successHandler(true, 200, 'Device updated successfully', deviceExists);
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteDevice(deviceId: string): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne(deviceId);

      if (!deviceExists) {
        return new BadRequestException('Device doesn´t exists or has already been deleted');
      }

      await this.devicesRepository.delete(deviceId);

      return successHandler(true, 200, 'Device deleted successfully', deviceExists);
    } catch (e) {
      return new Error(e);
    }
  }
}
