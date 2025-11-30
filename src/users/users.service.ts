import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { store, UserEntity } from '../store/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  findAll(): Omit<UserEntity, 'password'>[] {
    return store.users.map(
      (u) =>
        Object.fromEntries(
          Object.entries(u).filter(([k]) => k !== 'password'),
        ) as Omit<UserEntity, 'password'>,
    );
  }

  findById(id: string): Omit<UserEntity, 'password'> {
    const user = store.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return Object.fromEntries(
      Object.entries(user).filter(([k]) => k !== 'password'),
    ) as Omit<UserEntity, 'password'>;
  }

  create(login: string, password: string): Omit<UserEntity, 'password'> {
    const now = Date.now();
    const user: UserEntity = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    store.users.push(user);
    return Object.fromEntries(
      Object.entries(user).filter(([k]) => k !== 'password'),
    ) as Omit<UserEntity, 'password'>;
  }

  updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Omit<UserEntity, 'password'> {
    const user = store.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is wrong');
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return Object.fromEntries(
      Object.entries(user).filter(([k]) => k !== 'password'),
    ) as Omit<UserEntity, 'password'>;
  }

  remove(id: string): void {
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    store.users.splice(idx, 1);
  }
}
