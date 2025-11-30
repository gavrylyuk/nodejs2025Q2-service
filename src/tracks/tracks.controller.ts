import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidParamPipe } from '../common/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { TrackResponse } from '../common/swagger-models';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  @ApiOkResponse({ type: TrackResponse, isArray: true })
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TrackResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: TrackResponse })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
  })
  create(@Body() dto: CreateTrackDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ type: TrackResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateTrackDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
