import pool from "../db/db";
import {AirportInterface} from "../interfaces/airport.interface";
import {RouteDbInterface} from "../interfaces/db/route.db.interface";

export class FlightRepository {
    startAirport: string;
    destinationAirport: string;

    constructor(startAirport: string, destinationAirport: string) {
        this.startAirport = startAirport;
        this.destinationAirport = destinationAirport;
    }

    public async getRoute():Promise<Array<RouteDbInterface>>{

        const queryObject = {
            text: 'SELECT * FROM get_route($1, $2);',
            values: [this.startAirport, this.destinationAirport],
        }

        const res = await pool.query(queryObject);

        return res.rows.map( row => {
            return <RouteDbInterface> {
                seq: row['seq'],
                airportId: row['airportid'],
                airportName: row['airportname'],
                IATA_code: row['iata_code'],
                GPS_code: row['gps_code'],
                distance: row['distance']
            }
        })
    }


}