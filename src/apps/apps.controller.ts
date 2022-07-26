import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppsService } from './apps.service';
import CreateAppsDto from './dto/create-apps.dto';
import UpdateAppDto from './dto/UpdateAppDto.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getApps() {
    return this.appsService.getApps();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':appId')
  async getUniqueApp(@Param('appId', ParseIntPipe) appId: number) {
    return this.appsService.getUniqueApp(appId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createApp(@Body() newApp: CreateAppsDto) {
    return this.appsService.createApp(newApp);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':appId')
  async updateApp(
    @Body() updatedApp: UpdateAppDto,
    @Param('appId', ParseIntPipe) appId: number,
  ) {
    return this.appsService.updateApp(updatedApp, appId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':appId')
  async deleteApp(@Param('appId', ParseIntPipe) appId: number) {
    return this.appsService.deleteApp(appId);
  }
}
