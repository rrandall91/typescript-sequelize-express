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

## Testing

For ease, `runTests.sh` runs the application tests from within the Docker container, eliminating the need to connect to a local database. All test data is deleted after running the tests.

```bash
$ ./runTests.sh

## Generates the below output

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   91.47 |    57.14 |     100 |    91.2 |                   
 src                   |     100 |       50 |     100 |     100 |                   
  index.ts             |     100 |       50 |     100 |     100 | 8                 
 src/controllers       |   82.46 |       50 |     100 |   82.46 |                   
  posts.controller.ts  |   82.35 |       50 |     100 |   82.35 | 12,23,40,46,63,70 
  users.controller.ts  |   82.61 |       50 |     100 |   82.61 | 12,24,42,50       
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
 src/router/middleware |   88.89 |       50 |     100 |    87.5 |                   
  auth.middleware.ts   |   88.89 |       50 |     100 |    87.5 | 12                
-----------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        7.393 s

```