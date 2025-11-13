import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module } from './storage/s3.module';
import { kanbanModule } from './sac/kanban/kanban.module';


@Module({
imports: [
    PrismaModule,
    S3Module,
    kanbanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
