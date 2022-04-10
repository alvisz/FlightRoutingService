CREATE FUNCTION get_airport(code text)
    RETURNS SETOF airports
    LANGUAGE plpgsql AS
    $$
    BEGIN
    RETURN QUERY
    SELECT *
    FROM airports
    WHERE iata_code IS NOT NULL AND (iata_code = UPPER(code) OR gps_code = UPPER(code))
        LIMIT 1;
    END;
$$;

CREATE OR REPLACE FUNCTION calculate_route_data()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS
    $$
    BEGIN
        UPDATE routes
        SET (start_lat, start_lng) = (SELECT latitude, longitude FROM get_airport(routes.start))
        WHERE start_lat IS NULL;

        UPDATE routes
        SET (end_lat, end_lng) = (SELECT latitude, longitude FROM get_airport(routes.destination))
        WHERE end_lat IS NULL;

        UPDATE routes
        SET flight_path = ST_MakeLine(ST_SetSRID(ST_POINT(start_lng, start_lat),4326),ST_SetSRID(ST_POINT(end_lng, end_lat),4326))
        WHERE flight_path IS NULL;

        UPDATE routes
        SET distance = ST_Length(flight_path::geography)
        WHERE distance IS NULL;

        UPDATE routes
        SET source = (SELECT id FROM get_airport(routes.start)), target = (SELECT id FROM get_airport(routes.destination))
        WHERE source IS NULL or target IS NULL;
        RETURN NULL;
    END;
$$;

CREATE TRIGGER update_routes
    AFTER INSERT
    ON routes
    EXECUTE PROCEDURE calculate_route_data();

CREATE OR REPLACE FUNCTION get_route(startAirport text, destinationAirport text)
    RETURNS TABLE (seq int, airportid bigint, airportname character varying, iata_code character varying, gps_code character varying, distance double precision)
    LANGUAGE plpgsql AS
    $$
BEGIN
    RETURN QUERY
    SELECT d.seq, d.node as airportid, a.name as airportname, a.iata_code, a.gps_code, cost as distance FROM pgr_dijkstra(
        'SELECT id, source, target, distance as cost FROM routes',
        (SELECT id FROM get_airport(startAirport)),
        (SELECT id FROM get_airport(destinationAirport)), directed := TRUE) d
        LEFT JOIN
        airports a ON a.id = node
        ORDER BY path_seq;
    END;
$$;

-- Just to run the trigger, so it is not run every time when each row is imported
INSERT INTO public.routes (start, destination) VALUES ('AUH', 'RIX');

-- The data is sh!t. There are routes that have no airport info in DB.
-- Too lazy to put more time into making the data better quality...
DELETE FROM public.routes WHERE source IS NULL OR target IS NULL;