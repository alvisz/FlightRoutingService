import {Request, Response, NextFunction } from "express";
import {AirportInterface} from "../interfaces/airport.interface";
import {RoutingService} from "../services/routing.service";
import {AirportRepository} from "../repositories/airport.repository";
import {Trip} from "../models/trip.model";
import {Route} from "../interfaces/response/route.interface";
import {httpStatusCodes} from "../enums/http.status.enum";

class FlightController {

    public getRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const startAirport: AirportInterface | undefined = await AirportRepository.getAirport(res.locals.start);
            const destinationAirport: AirportInterface | undefined = await AirportRepository.getAirport(res.locals.destination);

            if (!startAirport || !destinationAirport) {
                // Should not happen anyways,
                // because there is already a validation before this controller, but for the sake of type checking :/
                res.sendStatus(httpStatusCodes.INTERNAL_SERVER);
                return;
            }

            const routingService = new RoutingService(startAirport.gpsCode, destinationAirport.gpsCode);
            const route = await routingService.getRoute();

            const trip = new Trip(route);

            if (trip.getFlightCount() > 4) {
                res.status(httpStatusCodes.BAD_REQUEST).send({message: 'Routing service did not find appropriate route.'});
            }

            const responseObject: Route = {
                start: routingService.startAirport,
                destination: routingService.destinationAirport,
                distance: trip.getDistance(),
                flights: trip.getRoute()
            }

            res.status(httpStatusCodes.OK).send(responseObject);

        } catch (error) {
          next(error);
        }
      };
}

export default FlightController;