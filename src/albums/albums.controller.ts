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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidParamPipe } from '../common/uuid.pipe';

@Controller('album')
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateAlbumDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
