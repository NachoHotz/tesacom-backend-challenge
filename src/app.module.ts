import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { DevicesController } from './devices/devices.controller';
import { AppsModule } from './apps/apps.module';
import { DevicesModule } from './devices/devices.module';
import { LoginModule } from './login/login.module';
import { config } from './config';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UsersModule,
    AppsModule,
    DevicesModule,
    LoginModule,
  ],
  controllers: [UsersController, DevicesController],
  providers: [],
})
export class AppModule {}
