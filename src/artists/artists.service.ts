import { Injectable, NotFoundException } from '@nestjs/common';
import { store, ArtistEntity } from '../store/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  findAll(): ArtistEntity[] {
    return store.artists;
  }
  findById(id: string): ArtistEntity {
    const a = store.artists.find((x) => x.id === id);
    if (!a) throw new NotFoundException('Artist not found');
    return a;
  }
  create(dto: { name: string; grammy: boolean }): ArtistEntity {
    const artist: ArtistEntity = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    store.artists.push(artist);
    return artist;
  }
  update(
    id: string,
    dto: Partial<{ name: string; grammy: boolean }>,
  ): ArtistEntity {
    const artist = this.findById(id);
    if (dto.name !== undefined) artist.name = dto.name;
    if (dto.grammy !== undefined) artist.grammy = dto.grammy;
    return artist;
  }
  remove(id: string): void {
    const idx = store.artists.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException('Artist not found');
    store.artists.splice(idx, 1);
    // Null references in albums and tracks, and remove from favorites
    store.albums.forEach((al) => {
      if (al.artistId === id) al.artistId = null;
    });
    store.tracks.forEach((tr) => {
      if (tr.artistId === id) tr.artistId = null;
    });
    store.favorites.artists = store.favorites.artists.filter((x) => x !== id);
  }
}
