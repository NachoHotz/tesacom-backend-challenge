import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Apps from './apps.entity';
import CreateAppsDto from './dto/create-apps.dto';
import UpdateAppDto from './dto/update-apps.dto';

@Injectable()
export class AppsService {
  constructor(@InjectRepository(Apps) private appsRepository: Repository<Apps>) {}

  getApps() {
    return this.appsRepository.find();
  }

  getUniqueApp(appsId: number) {
    return this.appsRepository.findOne(appsId);
  }

  createApp(newApp: CreateAppsDto) {
    return this.appsRepository.create(newApp);
  }

  updateApp(updatedApp: UpdateAppDto, appId: number) {
    return this.appsRepository.update(appId, updatedApp);
  }

  deleteApp(appId: number) {
    return this.appsRepository.delete(appId);
  }
}
