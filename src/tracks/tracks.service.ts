import { Injectable, NotFoundException } from '@nestjs/common';
import { store, TrackEntity } from '../store/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  findAll(): TrackEntity[] {
    return store.tracks;
  }
  findById(id: string): TrackEntity {
    const a = store.tracks.find((x) => x.id === id);
    if (!a) throw new NotFoundException('Track not found');
    return a;
  }
  create(dto: {
    name: string;
    artistId?: string | null;
    albumId?: string | null;
    duration: number;
  }): TrackEntity {
    const track: TrackEntity = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };
    store.tracks.push(track);
    return track;
  }
  update(
    id: string,
    dto: Partial<{
      name: string;
      artistId: string | null;
      albumId: string | null;
      duration: number;
    }>,
  ): TrackEntity {
    const track = this.findById(id);
    if (dto.name !== undefined) track.name = dto.name;
    if (dto.artistId !== undefined) track.artistId = dto.artistId;
    if (dto.albumId !== undefined) track.albumId = dto.albumId;
    if (dto.duration !== undefined) track.duration = dto.duration;
    return track;
  }
  remove(id: string): void {
    const idx = store.tracks.findIndex((x) => x.id === id);
    if (idx === -1) throw new NotFoundException('Track not found');
    store.tracks.splice(idx, 1);
    store.favorites.tracks = store.favorites.tracks.filter((x) => x !== id);
  }
}
