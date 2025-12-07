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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParamPipe } from '../common/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ArtistResponse } from '../common/swagger-models';

@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly service: ArtistsService) {}

  @Get()
  @ApiOkResponse({ type: ArtistResponse, isArray: true })
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArtistResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ArtistResponse })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
  })
  create(@Body() dto: CreateArtistDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ type: ArtistResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  update(@Param('id', UuidParamPipe) id: string, @Body() dto: UpdateArtistDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  remove(@Param('id', UuidParamPipe) id: string) {
    this.service.remove(id);
  }
}
