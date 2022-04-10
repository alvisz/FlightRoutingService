import {FlightRepository} from "../repositories/flight.repository";
import {routeToFlights} from "../utils/routeToFlights.util";
import {FlightInterface} from "../interfaces/flight.interface";

export class RoutingService {
    private readonly _startAirport: string;
    private readonly _destinationAirport: string;

    constructor(startAirport: string, destinationAirport: string) {
        this._startAirport = startAirport;
        this._destinationAirport = destinationAirport;
    }

    public async getRoute(): Promise<Array<FlightInterface>> {
        const flightRepository = new FlightRepository(this._startAirport, this._destinationAirport);
        const route = await flightRepository.getRoute();

        return routeToFlights(route);
    }


    get startAirport(): string {
        return this._startAirport.toUpperCase();
    }

    get destinationAirport(): string {
        return this._destinationAirport.toUpperCase();
    }
}