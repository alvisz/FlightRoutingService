import {FlightInterface} from "../flight.interface";

export interface Route {
    start: string,
    destination: string,
    distance: number,
    flights: Array<FlightInterface>
}