CREATE DATABASE IF NOT EXISTS developers_projects;

CREATE TYPE "OS" AS ENUM ('Windows', 'MacOS', 'Linux');

CREATE TABLE IF NOT EXISTS developers_infos(
    "id" SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferredOS" "OS" NOT NULL
);

CREATE TABLE IF NOT EXISTS developers(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS projects(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedTime" VARCHAR(20) NOT NULL,
    "repository" VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE
);

CREATE TABLE IF NOT EXISTS technologies(
    "id" SERIAL,
    "name" VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects_technologies(
    "id" SERIAL,
    "addedIn" DATE NOT NULL
);


INSERT INTO
    technologies("name")
VALUES
   ('JavaScript'), ('Python'), ('React'), ('Express.js'), ('HTML'), ('CSS'), ('Django'), ('PostgreSQL'), ('MongoDB');


ALTER TABLE developers
ADD "developers_infoID" INTEGER UNIQUE DEFAULT NULL; 

ALTER TABLE developers
ADD FOREIGN KEY ("developers_infoID" ) REFERENCES developers_infos("id") ON DELETE SET NULL;

ALTER TABLE developers_infos
ADD "devID" INTEGER UNIQUE DEFAULT NULL; 

ALTER TABLE developers_infos
ADD FOREIGN KEY ("devID" ) REFERENCES developers("id") ON DELETE CASCADE;

// TEM QUE MUDAR TUDO AQUI, VER O QUE FAZER COM A DESGRAÇA DESSA CHAVE ESTRANGEIRA DO CARALHO