/**Express server import */
import express, { json } from 'express';

/**Routers*/
import { routes as appRoutes } from './routes/index';

const HTTP_PORT = process.env.PORT || 3000;

export class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.set('port', HTTP_PORT);
        this.app.use(json());
        this.app.use(appRoutes);
    }

    start() {
        try {
            this.app.listen(this.app.get('port'), () => {
                console.log(`Server in port ${this.app.get('port')}`)
            });
        } catch (error: unknown) {
            if (error instanceof Error)
            console.log(`ERROR : ${error.message} STACK : ${error.stack}`);
        }
    }
}
