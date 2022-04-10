import {FlightInterface} from "../interfaces/flight.interface";

export class Trip {
    private readonly route: Array<FlightInterface>;

    constructor(route: Array<FlightInterface>) {
        this.route = route;
    }


    public getRoute(): Array<FlightInterface> {
        return this.route;
    }

    public getDistance(): number {
        return this.route.reduce((sum, a) => sum + a.distance, 0);
    }

    public getFlightCount(): number {
        return this.route.length;
    }
}