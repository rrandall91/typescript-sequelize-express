# Back-End Engineer Technical Assessment

This project implements a simple back-end API using Express.js, Sequelize, and TypeScript.

## Running the Project

The project can be started using Docker. The below ports are exposed by default:

| Port | Service |
|---|---|
| 80 | API |
| 5432| Database (Postgres) |

### Starting the Project

```bash
docker-compose up

## or you can run as a daemon
docker-compose up -d
```

Upon starting the project, a `data` directory is created to allow the PostgreSQL container data to persist.

#### Initial Data

Seed data is generated and imported into the database using `docker-compose exec app npm run db:seed`.

## Testing

For ease, `runTests.sh` runs the application tests from within the Docker container, eliminating the need to connect to a local database. All test data is deleted after running the tests.

```bash
$ ./runTests.sh

## Generates the below output

-----------------------|---------|----------|---------|---------|----------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s    
-----------------------|---------|----------|---------|---------|----------------------
All files              |   86.23 |    57.14 |     100 |   85.71 |                      
 src                   |     100 |       50 |     100 |     100 |                      
  index.ts             |     100 |       50 |     100 |     100 | 8                    
 src/controllers       |   73.44 |       50 |     100 |   73.02 |                      
  posts.controller.ts  |   73.68 |       50 |     100 |   72.97 | ...76-78,102,113-115 
  users.controller.ts  |   73.08 |       50 |     100 |   73.08 | 18-20,37-39,63,73-75 
 src/database          |     100 |       50 |     100 |     100 |                      
  connection.ts        |     100 |       50 |     100 |     100 | 3                    
 src/database/config   |     100 |      100 |     100 |     100 |                      
  db.config.js         |     100 |      100 |     100 |     100 |                      
 src/database/models   |     100 |      100 |     100 |     100 |                      
  post.model.ts        |     100 |      100 |     100 |     100 |                      
  user.model.ts        |     100 |      100 |     100 |     100 |                      
 src/router            |     100 |      100 |     100 |     100 |                      
  index.ts             |     100 |      100 |     100 |     100 |                      
  post.router.ts       |     100 |      100 |     100 |     100 |                      
  user.router.ts       |     100 |      100 |     100 |     100 |                      
 src/router/middleware |   81.82 |       50 |     100 |      80 |                      
  auth.middleware.ts   |   81.82 |       50 |     100 |      80 | 16-19                
-----------------------|---------|----------|---------|---------|----------------------

Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        4.144 s, estimated 7 s
```