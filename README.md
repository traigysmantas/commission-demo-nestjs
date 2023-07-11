## Installation

```bash
$ npm install
```

## Setup of Environment variables

example of env variables is provided in `example.env` file.

- to run app locally `.env` file setup is required.

- to run e2e tests` .env.test` file setup is required.

## Running the app

```bash
# setup environment to run app locally.
$ docker-compose up -d --wait db

# development
$ npm run start

# watch mode
$ npm run start:dev

# running using docker
$ docker-compose up
```

## Test

```bash
# setup (if docker was not stopped for dev environment)
docker-compose --env-file ./.env.test up -d --wait

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash

# generate migrations (locally)
NODE_ENV=development npm run typeorm:generate-migration --name=CreateTables

# create migration
 NODE_ENV=development npm run typeorm:create-migration --name=SeedDatabase
```

## Issues & Improvements

- Investigate disable Pino logger automatic tests
- Investigate why e2e tests does not exit gracefully
- Investigate how to run swc with docker for local development.
- Convert to monorepo & build other "analytics" app to query transactions per client.
