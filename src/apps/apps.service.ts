import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { successHandler } from 'src/helpers/successHandler';
import CreateAppsDto from './dto/create-apps.dto';
import UpdateAppDto from './dto/update-apps.dto';
import Apps from './apps.entity';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(Apps) private appsRepository: Repository<Apps>,
  ) {}

  async getApps(): Promise<Error | object> {
    try {
      const apps = await this.appsRepository.find();

      if (!apps || apps.length === 0) {
        return new NotFoundException('No apps found');
      }

      return successHandler(true, 201, 'Apps found', apps);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueApp(appId: number): Promise<Error | object> {
    try {
      const uniqueApp = await this.appsRepository.findOne(appId);

      if (!uniqueApp) {
        return new NotFoundException(`No app found with id ${appId}`);
      }

      return successHandler(true, 201, 'App found', uniqueApp);
    } catch (e) {
      return new Error(e);
    }
  }

  async createApp(newAppBody: CreateAppsDto): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(newAppBody.id);

      if (appExists) {
        return new BadRequestException(`App already registered with id ${newAppBody.id}`);
      }

      const newApp = await this.appsRepository.create(newAppBody);
      await this.appsRepository.save(newApp);

      return successHandler(true, 201, 'App created successfully', newApp);
    } catch (e) {
      return new Error(e);
    }
  }

  async updateApp(updatedApp: UpdateAppDto, appId: number): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(appId);

      if (!appExists) {
        return new BadRequestException(`No app found with id ${appId}`);
      }

      await this.appsRepository.update(appId, updatedApp);

      return successHandler(true, 201, 'App updated successfully', appExists);
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteApp(appId: number): Promise<Error | object> {
    try {
      const appExists = await this.appsRepository.findOne(appId);

      if (!appExists) {
        return new BadRequestException('App doesn´t exist or has benn already deleted');
      }

      await this.appsRepository.delete(appId);

      return successHandler(true, 201, 'App deleted successfully', appExists);
    } catch (e) {
      return new Error(e);
    }
  }
}
