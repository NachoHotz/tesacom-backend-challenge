import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateAppsDto from './dto/create-apps.dto';
import { AppsService } from './apps.service';
import UpdateAppDto from './dto/update-apps.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getApps() {
    return await this.appsService.getApps();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':appsId')
  async getUniqueApp(@Param('appsId') appsId: string) {
    return await this.appsService.getUniqueApp(parseInt(appsId));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createApp(@Body() newApp: CreateAppsDto) {
    return await this.appsService.createApp(newApp);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':appId')
  async updateApp(@Body() updatedApp: UpdateAppDto, @Param('appId') appId: string) {
    return await this.appsService.updateApp(updatedApp, parseInt(appId));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':appId')
  async deleteApp(@Param('appId') appId: string) {
    return await this.appsService.deleteApp(parseInt(appId));
  }
}
