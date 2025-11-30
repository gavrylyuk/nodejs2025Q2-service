import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { UuidParamPipe } from '../common/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesResponseModel } from '../common/swagger-models';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get()
  @ApiOkResponse({ type: FavoritesResponseModel })
  getAll() {
    return this.service.getAll();
  }

  @Post('track/:id')
  @ApiCreatedResponse({ description: 'Track added to favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Track is already favorite' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @HttpCode(201)
  addTrack(@Param('id', UuidParamPipe) id: string) {
    this.service.addTrack(id);
    return { message: 'Added to favorites' };
  }

  @Delete('track/:id')
  @ApiOkResponse({ description: 'Track removed from favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @HttpCode(204)
  removeTrack(@Param('id', UuidParamPipe) id: string) {
    this.service.removeTrack(id);
  }

  @Post('album/:id')
  @ApiCreatedResponse({ description: 'Album added to favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Album is already favorite' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @HttpCode(201)
  addAlbum(@Param('id', UuidParamPipe) id: string) {
    this.service.addAlbum(id);
    return { message: 'Added to favorites' };
  }

  @Delete('album/:id')
  @ApiOkResponse({ description: 'Album removed from favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @HttpCode(204)
  removeAlbum(@Param('id', UuidParamPipe) id: string) {
    this.service.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiCreatedResponse({ description: 'Artist added to favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Artist is already favorite' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @HttpCode(201)
  addArtist(@Param('id', UuidParamPipe) id: string) {
    this.service.addArtist(id);
    return { message: 'Added to favorites' };
  }

  @Delete('artist/:id')
  @ApiOkResponse({ description: 'Artist removed from favorites' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @HttpCode(204)
  removeArtist(@Param('id', UuidParamPipe) id: string) {
    this.service.removeArtist(id);
  }
}
