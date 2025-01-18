import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LogService } from './log.service';
import { IdDto, TailDto } from 'src/common/dto/global.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@ApiHeader({ name: 'x-api-key', required: true })
@UseGuards(ApiKeyGuard)
@ApiTags('Log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @ApiOkResponse({ type: String })
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiQuery({ name: 'tail', required: true, type: 'number' })
  @Get(':id')
  getContainerLogs(
    @Param(ValidationPipe) param: IdDto,
    @Query(ValidationPipe) query: TailDto,
  ): Promise<string> {
    return this.logService.getContainerLogs(param.id, query.tail);
  }
}
