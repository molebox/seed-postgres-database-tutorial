# Seed a Postgres Database Tutorial

## Preamble

This repository has a node script for seeding a Postgres database ([src/main.js](src/main.js)) and a tutorial guide for writing the script ([guide.md](./guide.md)).

To run the script locally ensure you have [Postgres](https://www.postgresql.org/download/) and [Nodejs](https://nodejs.org/en/download/) installed on your machine. This repo uses versions:

- Node: 14.15.1
- Postgres: 13.1

> Note: The script uses the Faker library to populate the table and database defined in the `schema.sql` file. It was developed on a **Windows** machine.

## Usage

Clone this repository and run `yarn` from the root. This project uses the default `postgres` user, if you have another user you wish to use instead replace `postgres` in the `create-db` script in the `package.json` file. Do the same in the `schema.sql` file.

### Set your env vars

- Create a new `.env` file at the projects root
- Copy the values from the `.env.example` file over and replace to match your local Postgres configuration.

An example of how your env vars values might look:

```env
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=test1234
PGDATABASE=translationsdb
PGPORT=5432
```

To create the default 10 rows in the table run `yarn seed` from a terminal. To create a custom amount of rows run `yarn seed --rows=x` where `x` is the number of rows you wish to create. You will be asked to login to Postgres each time the script is run using the credentials in the `.env` file.

> Note: Each time the script is run the database is dropped and re-created.
