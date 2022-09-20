import { MongoClient, Db } from 'mongodb';

const clients: Map<string, Db> = new Map();

interface connectionProperties {
    key?: string;
    conectionUrl?: string;
    database?: string;
    poolSize?: number;
}

const createConnection = async ({
    key = 'mongo_client',
    conectionUrl = '',
    database = 'database',
    poolSize = 1,
}: connectionProperties) => {
    const con: MongoClient = await MongoClient.connect(conectionUrl, {
        useNewUrlParser: true,
        bufferMaxEntries: 0,
        connectTimeoutMS: 5000,
        poolSize: poolSize,
        useUnifiedTopology: true,

    });
    const db: Db = con.db(database);
    clients.set(key, db);
};

const isConnected = async (db: Db) => {
    try {
        const connect = await db.command({
            connectionStatus: 1,
            showPrivileges: true,
        });
        return !!connect.ok;
    } catch (err) {
        return false;
    }
};

export { isConnected, createConnection, clients };
