import { Injectable, NotFoundException } from '@nestjs/common';
import { store, AlbumEntity } from '../store/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  findAll(): AlbumEntity[] {
    return store.albums;
  }
  findById(id: string): AlbumEntity {
    const a = store.albums.find((x) => x.id === id);
    if (!a) throw new NotFoundException('Album not found');
    return a;
  }
  create(dto: {
    name: string;
    year: number;
    artistId?: string | null;
  }): AlbumEntity {
    const album: AlbumEntity = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    store.albums.push(album);
    return album;
  }
  update(
    id: string,
    dto: Partial<{ name: string; year: number; artistId: string | null }>,
  ): AlbumEntity {
    const album = this.findById(id);
    if (dto.name !== undefined) album.name = dto.name;
    if (dto.year !== undefined) album.year = dto.year;
    if (dto.artistId !== undefined) album.artistId = dto.artistId;
    return album;
  }
  remove(id: string): void {
    const idx = store.albums.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException('Album not found');
    store.albums.splice(idx, 1);
    // Null references in tracks and remove from favorites
    store.tracks.forEach((tr) => {
      if (tr.albumId === id) tr.albumId = null;
    });
    store.favorites.albums = store.favorites.albums.filter((x) => x !== id);
  }
}
