# Home Library Service

In-memory NestJS REST API for managing Users, Artists, Albums, Tracks and Favorites. Passwords are never returned in responses. Deleting an Artist/Album/Track updates references (sets related foreign keys to `null`) and removes the entity from favorites automatically.

## Features
- Fully typed DTO validation via `class-validator` / global `ValidationPipe`.
- UUID param validation (400 on invalid UUID).
- Proper status codes: 201 create, 200 success, 204 delete, 400 bad input, 403 wrong old password, 404 not found, 422 cannot add non-existing favorite.
- In-memory data store prepared for easy DB replacement.
- OpenAPI spec stub in `doc/api.yaml` (can be integrated with Swagger UI).

## Prerequisites
- Node.js >= 22.14.0
- npm (bundled with Node.js)

## Clone & Install
```bash
git clone <repository-url>
cd nodejs2025Q2-service
npm install
```

## Environment
Configure port in `.env` (already provided):
```
PORT=4000
```

## Run the Service
```bash
npm start
```
Server listens on `http://localhost:4000`.

## API Overview
Base URL: `http://localhost:4000`

| Resource | Path Prefix | Description |
|----------|-------------|-------------|
| Users    | `/user`     | Manage users (password update increments version) |
| Artists  | `/artist`   | Manage artists; delete nulls references & removes from favorites |
| Albums   | `/album`    | Manage albums; delete nulls track `albumId` & removes from favorites |
| Tracks   | `/track`    | Manage tracks; delete removes from favorites |
| Favorites| `/favs`     | List/add/remove favorite Artists/Albums/Tracks |

### Users
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/user` | List all users (no passwords) |
| GET | `/user/:id` | 400 invalid UUID, 404 if not found |
| POST | `/user` | Body: `{ login, password }` returns created user minus password |
| PUT | `/user/:id` | Body: `{ oldPassword, newPassword }` 403 if oldPassword wrong |
| DELETE | `/user/:id` | 204 on success |

### Artists / Albums / Tracks (similar pattern)
| Method | Endpoint | Create Required Fields |
|--------|----------|------------------------|
| POST | `/artist` | `{ name, grammy }` |
| POST | `/album`  | `{ name, year }` (optional `artistId`) |
| POST | `/track`  | `{ name, duration }` (optional `artistId`, `albumId`) |

Update endpoints (`PUT`) accept any subset of fields (all optional) and return updated entity. Delete endpoints return 204 and cascade cleanup.

### Favorites
| Method | Endpoint | Behavior |
|--------|----------|----------|
| GET | `/favs` | Returns `{ artists: Artist[], albums: Album[], tracks: Track[] }` |
| POST | `/favs/artist/:id` | 201 if existing Artist; 422 if not found |
| POST | `/favs/album/:id`  | 201 if existing Album; 422 if not found |
| POST | `/favs/track/:id`  | 201 if existing Track; 422 if not found |
| DELETE | `/favs/artist/:id` | 404 if not currently favorite |
| DELETE | `/favs/album/:id`  | 404 if not currently favorite |
| DELETE | `/favs/track/:id`  | 404 if not currently favorite |

### Status Codes Summary
| Code | Meaning |
|------|---------|
| 200 | Success (GET/PUT) |
| 201 | Created (POST) |
| 204 | Deleted/No Content (DELETE) |
| 400 | Invalid UUID / Bad body |
| 403 | Wrong old password (user password update) |
| 404 | Entity not found |
| 422 | Favorite add for non-existing entity |

## Example Requests (curl)
Create user:
```bash
curl -X POST http://localhost:4000/user \
	-H 'Content-Type: application/json' \
	-d '{"login":"alice","password":"secret"}'
```
Update user password:
```bash
curl -X PUT http://localhost:4000/user/<USER_ID> \
	-H 'Content-Type: application/json' \
	-d '{"oldPassword":"secret","newPassword":"newSecret"}'
```
Add track to favorites:
```bash
curl -X POST http://localhost:4000/favs/track/<TRACK_ID>
```

## OpenAPI / Swagger
`doc/api.yaml` contains a draft spec. To integrate Swagger UI later, install `@nestjs/swagger` & configure in `main.ts` (not yet included to keep dependencies minimal for the in-memory stage).

## Testing
Run the full e2e suite:
```bash
npm run test
```
Authorization-specific suites:
```bash
npm run test:auth
npm run test:refresh
```
Target a single suite:
```bash
npm run test -- test/users.e2e.spec.ts
```

## Code Quality
Format & lint:
```bash
npm run lint
npm run format
```

## Debugging (VS Code)
Press `F5` with a configured launch profile or use:
```bash
npm run start:debug
```

## Future Improvements
- Persist data in a real database (e.g., PostgreSQL) with repositories.
- Implement authentication & use provided `/login` & `/signup` paths.
- Hook Swagger UI to serve the spec at `/doc`.
- Add unit tests for services (currently e2e focus).

## Troubleshooting
| Issue | Resolution |
|-------|------------|
| ECONNREFUSED during tests | Ensure server is started or start tests with script spinning server first. |
| 400 on POST | Check required fields present & non-empty. |
| 422 adding favorite | Verify entity exists before adding. |

## License
UNLICENSED (internal educational template).
