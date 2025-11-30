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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidParamPipe } from '../common/uuid.pipe';

@Controller('track')
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateTrackDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
