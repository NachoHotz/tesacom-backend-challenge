import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import Apps from './apps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apps])],
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService],
})
export class AppsModule {}
