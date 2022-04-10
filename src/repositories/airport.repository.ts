import pool from "../db/db";
import {AirportInterface} from "../interfaces/airport.interface";

export class AirportRepository {
    public static async getAirport(code: string): Promise<AirportInterface | undefined>{

        const queryObject = {
            text: 'SELECT * FROM get_airport($1);',
            values: [code],
        }

        const res = await pool.query(queryObject);

        if (res.rows[0]) {
            return <AirportInterface> {
                id: res.rows[0]['id'],
                name: res.rows[0]['name'],
                latitude: res.rows[0]['latitude'],
                longitude: res.rows[0]['longitude'],
                continent: res.rows[0]['continent'],
                country: res.rows[0]['iso_country'],
                gpsCode: res.rows[0]['gps_code'],
                IATACode: res.rows[0]['iata_code']
            }
        }
    }
}