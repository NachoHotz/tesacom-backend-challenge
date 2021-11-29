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
        return new NotFoundException('no devices found');
      }

      return successHandler(true, 200, 'Found', devices);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueDevice(deviceId: string): Promise<Error | object> {
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

  async createDevice(newDeviceBody: CreateDeviceDto): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne( newDeviceBody.serial);

      if (deviceExists) {
        return new BadRequestException( 'Device already registered with that serial');
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
        return new BadRequestException('Device doesn´t exist');
      }

      await this.devicesRepository.update(deviceId, updateDeviceBody);

      return successHandler(true, 200, 'device updated successfully', deviceExists);
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

      return successHandler(true, 200, 'device deleted successfully', deviceExists);
    } catch (e) {
      return new Error(e);
    }
  }
}
