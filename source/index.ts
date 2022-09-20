import { createConnection } from "./frameworks_drivers/storage/client/client";

const mongoClient = 'mongo_client';
const URL = 'mongodb://127.0.0.1:27017';
const dbName = 'store';

const main = async () => {
    try {
        await createDBConnection();
        await startWebApp();

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`ERROR : ${error.message} STACK : ${error.stack}`);
        }
    }
};

// CONEXIÓN CON LA BASE DE DATOS
const createDBConnection = async () => {
    const MONGO_CLIENT = process.env.MONGO_CLIENT || mongoClient;
    const URI_MONGO = process.env.URI_MONGO || URL;
    const MONGO_DATABASE = process.env.MONGO_DATABASE || dbName;
    const POOLSIZE = process.env.POOLSIZE || '1';
    await createConnection({
        key: MONGO_CLIENT,
        conectionUrl: URI_MONGO,
        database: MONGO_DATABASE,
        poolSize: parseInt(POOLSIZE),
    });
};

// INICIA EL SERVIDOR
const startWebApp = async () => {
    const { Server } = await import("./frameworks_drivers/web/server");
    const server = new Server();
    server.start();
};

main();