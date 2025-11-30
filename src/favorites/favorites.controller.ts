import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UuidParamPipe } from '../common/uuid.pipe';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', UuidParamPipe) id: string) {
    this.service.addTrack(id);
    return { message: 'Added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', UuidParamPipe) id: string) {
    this.service.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', UuidParamPipe) id: string) {
    this.service.addAlbum(id);
    return { message: 'Added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', UuidParamPipe) id: string) {
    this.service.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', UuidParamPipe) id: string) {
    this.service.addArtist(id);
    return { message: 'Added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', UuidParamPipe) id: string) {
    this.service.removeArtist(id);
  }
}
