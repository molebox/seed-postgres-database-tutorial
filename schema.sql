
-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS translationsdb;

-- Create the db
CREATE DATABASE translationsdb;

-- Move into the db
\c translationsdb

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Translations
(
    key character varying(100),
    lang character varying(5),
    content text
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE Translations
    OWNER to postgres;