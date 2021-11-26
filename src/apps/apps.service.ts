import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { successHandler } from 'src/helpers/handlers';
import Apps from './apps.entity';
import CreateAppsDto from './dto/create-apps.dto';
import UpdateAppDto from './dto/update-apps.dto';

@Injectable()
export class AppsService {
  constructor(@InjectRepository(Apps) private appsRepository: Repository<Apps>) {}

  async getApps(): Promise<{}> {
    try {
      const apps = await this.appsRepository.find();

      if (!apps || apps.length === 0) {
        return new NotFoundException('no apps found');
      }

      return successHandler(true, 201, 'Found', apps);
    } catch (e) {
      return new Error(e);
    }
  }

  async getUniqueApp(appsId: number): Promise<{}> {
    try {
      const uniqueApp = await this.appsRepository.findOne(appsId);

      if (!uniqueApp) {
        return new NotFoundException('no app found with that id');
      }

      return successHandler(true, 201, 'Found', uniqueApp);
    } catch (e) {
      return new Error(e);
    }
  }

  async createApp(newAppBody: CreateAppsDto): Promise<{}> {
    try {
      const newApp = await this.appsRepository.create(newAppBody);
      await this.appsRepository.save(newApp);

      return successHandler(true, 201, 'created successfully', newApp);
    } catch (e) {
      return new Error(e);
    }
  }

  async updateApp(updatedApp: UpdateAppDto, appId: number): Promise<{}> {
    try {
      await this.appsRepository.update(appId, updatedApp);

      return successHandler(true, 201, 'updated successfully');
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteApp(appId: number): Promise<{}> {
    try {
      await this.appsRepository.delete(appId);

      return successHandler(true, 201, 'app deleted successfully');
    } catch (e) {
      return new Error(e);
    }
  }
}
