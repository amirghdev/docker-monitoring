import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DockerModule } from '../docker/docker.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DockerModule, HttpModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
