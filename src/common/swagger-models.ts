import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ format: 'uuid' })
  id!: string;
  @ApiProperty()
  login!: string;
  @ApiProperty({ description: 'Incremented on password update' })
  version!: number;
  @ApiProperty({ description: 'Creation timestamp (ms since epoch)' })
  createdAt!: number;
  @ApiProperty({ description: 'Update timestamp (ms since epoch)' })
  updatedAt!: number;
}

export class ArtistResponse {
  @ApiProperty({ format: 'uuid' })
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  grammy!: boolean;
}

export class AlbumResponse {
  @ApiProperty({ format: 'uuid' })
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  year!: number;
  @ApiProperty({ format: 'uuid', nullable: true })
  artistId!: string | null;
}

export class TrackResponse {
  @ApiProperty({ format: 'uuid' })
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty({ format: 'uuid', nullable: true })
  artistId!: string | null;
  @ApiProperty({ format: 'uuid', nullable: true })
  albumId!: string | null;
  @ApiProperty({ description: 'Length in seconds' })
  duration!: number;
}

export class FavoritesResponseModel {
  @ApiProperty({ type: [ArtistResponse] })
  artists!: ArtistResponse[];
  @ApiProperty({ type: [AlbumResponse] })
  albums!: AlbumResponse[];
  @ApiProperty({ type: [TrackResponse] })
  tracks!: TrackResponse[];
}
