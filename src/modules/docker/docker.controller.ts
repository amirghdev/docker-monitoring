import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DockerService } from './docker.service';
import { DockerContainer } from 'src/common/types/global.type';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@ApiHeader({ name: 'x-api-key', required: true })
@ApiTags('Docker')
@UseGuards(ApiKeyGuard)
@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @ApiOkResponse({ type: DockerContainer, isArray: true })
  @Get('containers')
  async getAllContainers(): Promise<DockerContainer[]> {
    return this.dockerService.getAllContainers();
  }
}
