import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import FlightController from "../controllers/flight.controller";
import validationMiddleware from "../middlewares/validation.middlewate";

class FlightRoute implements Route {
    public router = Router();
    public flightController = new FlightController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`/getRoute`, validationMiddleware,  this.flightController.getRoute);
    }
    
}

export default FlightRoute;