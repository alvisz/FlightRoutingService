import {RouteDbInterface} from "../interfaces/db/route.db.interface";
import {FlightInterface} from "../interfaces/flight.interface";


export function routeToFlights(route: Array<RouteDbInterface>): Array<FlightInterface> {
    const flights: Array<FlightInterface> = [];
    for (const [index, cur] of route.entries())
    {
        const nextItem = route[index+1];

        if (nextItem) {
            const flight: FlightInterface = {
                start: cur.IATA_code ? cur.IATA_code : cur.GPS_code,
                startName: cur.airportName,
                destination: nextItem.IATA_code ? nextItem.IATA_code : nextItem.GPS_code,
                destinationName: nextItem.airportName,
                distance: Math.round(cur.distance/1000)
            }
            flights.push(flight);
        }
    }
    return flights;
}