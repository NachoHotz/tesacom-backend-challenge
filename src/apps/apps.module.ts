import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppsController } from './apps.controller';
import Apps from './apps.entity';
import { AppsService } from './apps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apps])],
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService]
})
export class AppsModule {}
