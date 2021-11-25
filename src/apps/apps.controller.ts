import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateAppsDto from './dto/create-apps.dto';
import { AppsService } from './apps.service';
import UpdateAppDto from './dto/update-apps.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  getApps() {
    return this.appsService.getApps();
  }

  @Get(':appsId')
  getUniqueApp(@Param('appsId') appsId: string) {
    return this.appsService.getUniqueApp(parseInt(appsId));
  }

  @Post()
  createApp(@Body() newApp: CreateAppsDto) {
    return this.appsService.createApp(newApp);
  }

  @Put(':appId')
  updateApp(@Body() updatedApp: UpdateAppDto, @Param('appId') appId: string) {
    return this.appsService.updateApp(updatedApp, parseInt(appId));
  }

  @Delete('appId')
  deleteApp(@Param('appId') appId: string) {
    return this.appsService.deleteApp(parseInt(appId));
  }
}
