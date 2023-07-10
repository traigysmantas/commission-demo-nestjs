## Installation

```bash
$ npm install
```

## Setup of Environment variables

example of env variables is provided in `example.env` file.

- to run app `.env.development` file setup is required.

- to run e2e tests` .env.test` file setup is required.

## Running the app

```bash
# setup
$ docker-compose --env-file ./.env.development up -d --wait

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# setup (if docker was not stopped for dev environment)
docker-compose --env-file ./.env.development down

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Issues/Improvements

- Investigate disable Pino logger automatic tests
- Investigate why e2e tests does not exit gracefully
- Add migrations with typeORM.
