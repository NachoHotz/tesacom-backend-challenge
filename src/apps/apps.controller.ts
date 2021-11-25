import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateAppsDto from './dto/create-apps.dto';
import { AppsService } from './apps.service';
import UpdateAppDto from './dto/update-apps.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  async getApps() {
    return await this.appsService.getApps();
  }

  @Get(':appsId')
  async getUniqueApp(@Param('appsId') appsId: string) {
    return await this.appsService.getUniqueApp(parseInt(appsId));
  }

  @Post()
  async createApp(@Body() newApp: CreateAppsDto) {
    return await this.appsService.createApp(newApp);
  }

  @Put(':appId')
  async updateApp(@Body() updatedApp: UpdateAppDto, @Param('appId') appId: string) {
    return await this.appsService.updateApp(updatedApp, parseInt(appId));
  }

  @Delete(':appId')
  async deleteApp(@Param('appId') appId: string) {
    return await this.appsService.deleteApp(parseInt(appId));
  }
}
