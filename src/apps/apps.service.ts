import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SuccessHandler from '../helpers/successHandler';
import CreateAppsDto from './dto/create-apps.dto';
import UpdateAppDto from './dto/update-apps.dto';
import Apps from './apps.entity';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(Apps) private appsRepository: Repository<Apps>,
  ) {}

  /**
 Returns all instances of an app from the database.

 If there is an error with the request, it will return an error of type Error with more information.

 If there are no apps found, it returns an error of type NotFoundException with more information.

 @return object - an object return by the SuccessHandler class when the request is successfull. Check this class to learn more.
*/
  async getApps(): Promise<Error | object> {
    try {
      const apps = await this.appsRepository.find();

      if (!apps || apps.length === 0) {
        return new NotFoundException('No apps found');
      }

      return new SuccessHandler(true, 200, 'Apps found', apps);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
 * Returns an unique app from the database.
 *
 * If there is a error with the request, it will return an error of type Error with more information.
 *
 * If there is no app found, it returns an error of type NotFoundException with more information.
 *
 *@param appId - number - the app id to search. The id is validated before being searched. It must be a numeric string to work.

  @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more.
*/
  async getUniqueApp(appId: number): Promise<Error | object> {
    try {
      const uniqueApp = await this.appsRepository.findOne(appId);

      if (!uniqueApp) {
        return new NotFoundException(`No app found with id ${appId}`);
      }

      return new SuccessHandler(true, 200, 'App found', uniqueApp);
    } catch (e) {
      return new Error(e);
    }
  }

  /**
   * Creates a new instance of an app in the database.
   *
   * If there is an error with the request, it will return an error of type Error with more information.
   *
   * @param newAppBody: CreateAppsDto - an object containing of all the app infomrmation for its creation.
   *
   * It has the following properties:
   * - id: number - the id of the app
   * - name: string
   * - url: string
   * - icon: string
   * - created: date
   *
   * All of the app properties are validated before being created.
   *
   * If one of the properties is not valid, it will return an Error object with information of why the property is not valid.
   *
   * If there is a property that is not present in the CreateAppsDto, it will be ignored by this method, and not inserted into the new User instance.
   *
   * @returns Error - if there is an app in the database with the same id as the one to be created, it will return an error of type BadRequestException with more information.
   *
   * @returns object - an object returned by the SuccessHandler class when the request is successfull. Check this class to learn more
   */
  async createApp(newAppBody: CreateAppsDto): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(newAppBody.id);

      if (appExists) {
        return new BadRequestException(
          `App already registered with id ${newAppBody.id}`,
        );
      }

      const newApp = await this.appsRepository.create(newAppBody);
      await this.appsRepository.save(newApp);

      return new SuccessHandler(true, 201, 'App created successfully', newApp);
    } catch (e) {
      return new Error(e);
    }
  }

  async updateApp(
    updatedApp: UpdateAppDto,
    appId: number,
  ): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(appId);

      if (!appExists) {
        return new BadRequestException(`No app found with id ${appId}`);
      }

      await this.appsRepository.update(appId, updatedApp);

      return new SuccessHandler(
        true,
        200,
        'App updated successfully',
        appExists,
      );
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteApp(appId: number): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(appId);

      if (!appExists) {
        return new BadRequestException(
          'App doesn´t exist or has benn already deleted',
        );
      }

      await this.appsRepository.delete(appId);

      return new SuccessHandler(
        true,
        200,
        'App deleted successfully',
        appExists,
      );
    } catch (e) {
      return new Error(e);
    }
  }
}
