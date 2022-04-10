import 'dotenv/config';
import pool from "./db/db";
import express from 'express';
import FlightRoute from './routes/flight.route';
import errorHandler from "./handlers/error.handler";

class App {

    public app: express.Application;
    public port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initRoutes();
        this.initDb();
        this.listen();
        this.app.use(errorHandler);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Flight router listening on port ${this.port}`);
        })
    }

    private initRoutes(): void {
        const flightRoutes = new FlightRoute().router;
        this.app.use('/flights', flightRoutes)
        this.app.use('/healthcheck', function (req, res){res.sendStatus(200)})
    }

    private initDb() {
        pool.connect(function (err: Error){
            if (err) {
                console.log('Could not connect to DB... (╯°□°）╯︵ ┻━┻')
                process.exit(0); //
                return;
            }
            console.log('Database connected. 😎');
        });
    }

}

new App();