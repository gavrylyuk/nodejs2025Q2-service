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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParamPipe } from '../common/uuid.pipe';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly service: ArtistsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateArtistDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
