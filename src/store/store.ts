import { v4 as uuidv4 } from 'uuid';

export interface UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;
}

export interface AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface FavoritesEntityIds {
  artists: string[];
  albums: string[];
  tracks: string[];
}

class InMemoryStore {
  users: UserEntity[] = [];
  artists: ArtistEntity[] = [];
  albums: AlbumEntity[] = [];
  tracks: TrackEntity[] = [];
  favorites: FavoritesEntityIds = { artists: [], albums: [], tracks: [] };
}

export const store = new InMemoryStore();

// Seed minimal data for manual checks (not required by tests)
export function seedDemoData(): void {
  if (store.users.length === 0) {
    const now = Date.now();
    store.users.push({
      id: uuidv4(),
      login: 'admin',
      password: 'admin',
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }
}
