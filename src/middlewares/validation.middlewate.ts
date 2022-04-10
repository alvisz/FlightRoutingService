import {Request, Response, NextFunction} from "express";
import validator from 'validator';
import {ValidationException} from "../exceptions/validation.exception";
import {AirportRepository} from "../repositories/airport.repository";

async function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const start = typeof req.query.start === 'string' ? req.query.start : "";
        const destination = typeof req.query.destination === 'string' ? req.query.destination : "";

        await validate('start', start);
        await validate('destination', destination);

        res.locals.start = start;
        res.locals.destination = destination;

        next();
    } catch (e){
        next(e);
    }
}

async function validate(fieldName: string, value: string) {
    if (validator.isEmpty(value, { ignore_whitespace: true})) {
        throw new ValidationException(fieldName, 'Airport code not provided');
    }
    if (!validator.isLength(value, {min:1, max: 5})) {
        throw new ValidationException(fieldName, 'Airport code not valid. Airport code max length: 5');
    }
    if (!validator.isAlphanumeric(value)) {
        throw new ValidationException(fieldName, 'Airport code can contain only alphanumeric characters');
    }

    const airportExists = await AirportRepository.getAirport(value);

    if (!airportExists) {
        throw new ValidationException(fieldName, 'Airport does not exist');
    }
}

export default validationMiddleware;