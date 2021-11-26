import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { DevicesController } from './devices/devices.controller';
import { AppsController } from './apps/apps.controller';
import { AppsModule } from './apps/apps.module';
import { DevicesModule } from './devices/devices.module';
import { LoginModule } from './login/login.module';
import User from './users/user.entity';
import Apps from './apps/apps.entity';
import Devices from './devices/devices.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nacho',
      password: 'sempron3',
      database: 'tesacom',
      entities: [User, Apps, Devices],
      synchronize: true,
    }),
    UsersModule,
    AppsModule,
    DevicesModule,
    LoginModule,
  ],
  controllers: [UsersController, DevicesController, AppsController],
  providers: [],
})
export class AppModule {}
