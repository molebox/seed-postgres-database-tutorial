# How to seed a Postgres database with node

This short guide will walk through an implementation for seeding a Postgres database. We'll cover the when and why's, create a working example of a seeding script and touch on some of the pros and cons as to the chosen approach.

## Prerequisites

- You must have Postgres [installed on your machine](https://www.postgresql.org/download/)
- You must have Node [installed on your machine](https://nodejs.org/en/download/)

> This article uses version 13.1 of Postgres and version 14.15.1 of Node

## What do we mean by seed?

The process of seeding (in the context of databases) is to insert or populate the initial data into the database. This can be either a manual or automated step in the setup of an application. Seeding can also be used when testing different branches, for example if we have a dev branch where we want to test some new sort query against the database, seeding would be a good way to test against data that wont affect a production build. Of course, there are many reason one might choose to seed a database. In some instances an applications database actually requires there to be some form of data present before it will work properly, such as an admin account. But more often than not the seed would take place pre-install and thus allow the user to begin using the app without any issues.

## The seed script

The first iteration will be a node script that will accomplish the following:

- Create a database with a table.
- Create a csv file and populate it with fake data using the [faker](https://github.com/Marak/Faker.js) library. We'll add 10 records to begin with.
- Parse that data and insert it into our table - seed the database.




