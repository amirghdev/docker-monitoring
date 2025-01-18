import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { DockerModule } from '../docker/docker.module';

@Module({
  imports: [DockerModule],
  providers: [LogService],
  controllers: [LogController],
})
export class LogModule {}
