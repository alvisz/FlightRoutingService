import {Request, Response, NextFunction} from "express";
import {ValidationException} from "../exceptions/validation.exception";

function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationException) {
        res.status(err.status).send({ field: err.field, error: err.message });
    } else {
        next(err);
    }
}

export default errorHandler;

