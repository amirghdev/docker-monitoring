import {
  Controller,
  Get,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ActionService } from './action.service';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { IdDto } from 'src/common/dto/global.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@ApiHeader({ name: 'x-api-key', required: true })
@ApiTags('Action')
@UseGuards(ApiKeyGuard)
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get('start/:id')
  async startContainer(
    @Param(ValidationPipe) param: IdDto,
  ): Promise<{ message: string }> {
    return this.actionService.startContainer(param.id);
  }

  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get('stop/:id')
  async stopContainer(
    @Param(ValidationPipe) param: IdDto,
  ): Promise<{ message: string }> {
    return this.actionService.stopContainer(param.id);
  }

  @ApiParam({ name: 'id', required: true, type: 'string' })
  @Get('restart/:id')
  async restartContainer(
    @Param(ValidationPipe) param: IdDto,
  ): Promise<{ message: string }> {
    return this.actionService.restartContainer(param.id);
  }
}
