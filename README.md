# Tesacom Backend Challenge

## Description

Backend Challenge for the position of Backend Developer at Tesacom.

API made with `Nest.js` as backend framework, `TypeORM` as database managment, `MySQL` as the database itself, and `JWT` for user authentication. 

### IMPORTANT

For the app to work properly, you must create a .env file in the root directory with the following variables:

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`

`DB_NAME`

`JWT_SECRET`

The rest is managed by the application.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Nest is [MIT licensed](LICENSE).
