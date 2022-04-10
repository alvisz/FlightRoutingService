CREATE EXTENSION IF NOT EXISTS Postgis;
CREATE EXTENSION IF NOT EXISTS pgrouting CASCADE;

-- Creation of airports table
CREATE TABLE IF NOT EXISTS airports (
    id SERIAL PRIMARY KEY,
    type CHARACTER VARYING(64),
    name CHARACTER VARYING(256),
    latitude numeric,
    longitude numeric,
    coordinates GEOGRAPHY(POINT),
    continent CHARACTER VARYING(8),
    iso_country CHARACTER VARYING(8),
    gps_code CHARACTER VARYING(8),
    iata_code CHARACTER VARYING(8)
);

CREATE INDEX gps_code_idx ON airports (gps_code);
CREATE INDEX iata_code_idx ON airports (iata_code);

-- Creation of routes table

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    start CHARACTER VARYING(8),
    destination CHARACTER VARYING(8),
    isflight boolean DEFAULT true,
    distance double precision,
    start_lat double precision,
    start_lng double precision,
    end_lat double precision,
    end_lng double precision,
    flight_path geometry(LineString, 4326),
    source integer,
    target integer
    );

CREATE INDEX start_idx ON routes (start);
CREATE INDEX destination_idx ON routes (destination);
