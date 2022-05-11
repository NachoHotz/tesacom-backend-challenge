import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SuccessHandler from '../helpers/successHandler';
import Devices from './devices.entity';
import CreateDeviceDto from './dto/create-devices.dto';
import UpdateDeviceDto from './dto/update-devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>,
  ) {}

  /**
   * Returns all the instances of a device in the database.
   *
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * If no devices are found, it will return an error of type NotFoundException with more information.
   *
   * @returns object - an object returned by the SuccessHandler class. Check this class to learn more.
   */
  async getDevices(): Promise<Error | object> {
    try {
      const devices = await this.devicesRepository.find();

      if (!devices || devices.length === 0) {
        return new NotFoundException('No devices found');
      }

      return new SuccessHandler(true, 200, 'Devices found', devices);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
    * Returns a unique device from the database.
    *
    * If there is a error with the request, it will return an error of type Error with more information.
    *
    * If there is no device found, it returns an error of type NotFoundException with more information.
    *
    *@param deviceId - string - the device id to search. The id is the serial number of the device.

    @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more.
  */
  async getUniqueDevice(deviceId: string): Promise<Error | object> {
    try {
      const uniqueDevice = await this.devicesRepository.findOne(deviceId);

      if (!uniqueDevice) {
        return new NotFoundException(
          `No device found with serial number ${deviceId}`,
        );
      }

      return new SuccessHandler(true, 200, 'Device found', uniqueDevice);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Creates a new instance of a Device in the database.
   *
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * @param newDeviceBody: CreateDeviceDto - an object containing of all the device infomrmation for its creation.
   *
   * It has the following properties:
   * - serial: string - serial number of the device (PK)
   * - alias: string
   * - model: string
   * - code: number
   * - created: date
   *
   * All of the device properties are validated before being created.
   *
   * If one of the properties is not valid, it will return an Error object with information of why the property is not valid.
   *
   * If there is a property that is not present in the CreateDeviceDto, it will be ignored by this method, and not inserted into the new Device instance.
   *
   * @returns Error - if there is a device in the database with the same serial number as the one to be created, it will return an error of type BadRequestException with more information.
   *
   * @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more
   */
  async createDevice(newDeviceBody: CreateDeviceDto): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne(
        newDeviceBody.serial,
      );

      if (deviceExists) {
        return new BadRequestException(
          `Device already registered with serial number ${newDeviceBody.serial}`,
        );
      }

      const newDevice = this.devicesRepository.create(newDeviceBody);

      await this.devicesRepository.save(newDevice);

      return new SuccessHandler(
        true,
        201,
        'Device created successfully',
        newDevice,
      );
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Updates an instance of a Device in the database
   *
   * If there is an error with the request, it return an error of type Error with more information.
   *
   * @param deviceId - string - the id of the device to update. The id is the serial number of the device.
   *
   * If a device is not found with that id, it will return an error of type BadRequestException with more information.
   *
   * @param updateDeviceBody: UpdateDeviceDto - the object with the properties to update with the new information.
   *
   * @returns object - an object which is returned by the SuccessHandler class if the request is successfull. Check this class to learn more.
   */
  async updateDevice(
    updateDeviceBody: UpdateDeviceDto,
    deviceId: string,
  ): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne(deviceId);

      if (!deviceExists) {
        return new BadRequestException(
          `No device found with serial number ${deviceId} to edit`,
        );
      }

      await this.devicesRepository.update(deviceId, updateDeviceBody);

      return new SuccessHandler(
        true,
        200,
        'Device updated successfully',
        deviceExists,
      );
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Delete an instance of a Device from the database
   *
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * @param deviceId - string - the id of the device to delete. It is the serial number of the device.
   *
   * If a devcie is not found with that serial number, it returns an error of type BadRequestException with more information.
   *
   * @returns object - an object which is returned by the SuccessHandler class when the request is successfull. Check this class to learn more.
   */
  async deleteDevice(deviceId: string): Promise<Error | object> {
    try {
      const deviceExists = await this.devicesRepository.findOne(deviceId);

      if (!deviceExists) {
        return new BadRequestException(
          'Device doesn´t exists or has already been deleted',
        );
      }

      await this.devicesRepository.delete(deviceId);

      return new SuccessHandler(
        true,
        200,
        'Device deleted successfully',
        deviceExists,
      );
    } catch (e) {
      return new Error(e);
    }
  }
}
