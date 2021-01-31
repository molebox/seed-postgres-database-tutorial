# Seed a Postgres Database Tutorial

## Preamble

This project has a node script for seeding a Postgres database and a tutorial guide for writing the script.

To run the project locally ensure you have [Postgres](https://www.postgresql.org/download/) and [Nodejs](https://nodejs.org/en/download/) installed on your machine. This repo uses versions:

- Node: 14.15.1
- Postgres: 13.1

## Usage

Clone this repository and run `yarn` from the root. This project uses the default `postgres` user, if you have another user you wish to use instead replace `postgres` in the `create-db` script in the `package.json` file. Do the same in the `schema.sql` file.

Set your environment variables by copying the values from the `.env.example` file into a newly created `.env` file. Change the values to match your local Postgres configuration.

To create the default 10 rows run `yarn seed` from a terminal. To create a custom amount of rows run `yarn seed --rows=x` where `x` is the number of rows you wish to create.

Each time the script is run the database is dropped and re-created. To get a detailed run-down of how the script works read the `guide.md` file.
