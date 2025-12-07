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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidParamPipe } from '../common/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AlbumResponse } from '../common/swagger-models';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}

  @Get()
  @ApiOkResponse({ type: AlbumResponse, isArray: true })
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AlbumResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: AlbumResponse })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
  })
  create(@Body() dto: CreateAlbumDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ type: AlbumResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateAlbumDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
