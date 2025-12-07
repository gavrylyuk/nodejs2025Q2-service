import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { store, ArtistEntity, AlbumEntity, TrackEntity } from '../store/store';

export interface FavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

@Injectable()
export class FavoritesService {
  getAll(): FavoritesResponse {
    return {
      artists: store.favorites.artists
        .map((id) => store.artists.find((a) => a.id === id))
        .filter(Boolean) as ArtistEntity[],
      albums: store.favorites.albums
        .map((id) => store.albums.find((a) => a.id === id))
        .filter(Boolean) as AlbumEntity[],
      tracks: store.favorites.tracks
        .map((id) => store.tracks.find((a) => a.id === id))
        .filter(Boolean) as TrackEntity[],
    };
  }

  addTrack(id: string) {
    const exists = store.tracks.find((t) => t.id === id);
    if (!exists) throw new UnprocessableEntityException('Track not found');
    if (!store.favorites.tracks.includes(id)) store.favorites.tracks.push(id);
  }
  removeTrack(id: string) {
    const idx = store.favorites.tracks.findIndex((x) => x === id);
    if (idx === -1) throw new NotFoundException('Track is not favorite');
    store.favorites.tracks.splice(idx, 1);
  }

  addAlbum(id: string) {
    const exists = store.albums.find((a) => a.id === id);
    if (!exists) throw new UnprocessableEntityException('Album not found');
    if (!store.favorites.albums.includes(id)) store.favorites.albums.push(id);
  }
  removeAlbum(id: string) {
    const idx = store.favorites.albums.findIndex((x) => x === id);
    if (idx === -1) throw new NotFoundException('Album is not favorite');
    store.favorites.albums.splice(idx, 1);
  }

  addArtist(id: string) {
    const exists = store.artists.find((a) => a.id === id);
    if (!exists) throw new UnprocessableEntityException('Artist not found');
    if (!store.favorites.artists.includes(id)) store.favorites.artists.push(id);
  }
  removeArtist(id: string) {
    const idx = store.favorites.artists.findIndex((x) => x === id);
    if (idx === -1) throw new NotFoundException('Artist is not favorite');
    store.favorites.artists.splice(idx, 1);
  }
}
