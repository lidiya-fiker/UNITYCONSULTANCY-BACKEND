import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './shared/user.module';
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CounselorModule } from './counselor/counselor.module';
import { SeederService } from './seeder/seeder.service';

import { AdminModule } from './admin/admin.module';
import { HttpModule } from '@nestjs/axios';

import { NotificationModule } from './Notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [], // ✅ Required
      useFactory: () => dataSourceOptions,
    }),

    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.registerAsync({
      imports: [], // ✅ Required
      useFactory: async () => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        },
      }),
    }),

    HttpModule,
    UserModule,
    ClientModule,
    AuthModule,
    CounselorModule,
    AdminModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}

