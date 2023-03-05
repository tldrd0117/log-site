import { connect, Mongoose, ConnectionStates } from 'mongoose';
import dotenv from 'dotenv'


const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

class Mongo{
    address: string;
    database: string;
    db: Mongoose;

    constructor(address: string, database: string){
        this.address = address;
        this.database = database;
    }

    async connect(){
        this.db =  await connect(this.address, {
            dbName: this.database
        });
        this.db.set('autoIndex', false);
    }
    async resetDatabase(){
        if(!this.isConnect()) throw new Error("not connected!")
        await this.db.connection.dropDatabase();
        this.useDb()
    }

    async useDb(){
        if(!this.isConnect()) throw new Error("not connected!")
        await this.db.connection.useDb(this.database, {
            noListener: true
        }).asPromise()
    }

    isConnect(){
        if(this.db && this.db.connection){
            return this.db.connection.readyState === ConnectionStates.connected || this.db.connection.readyState === ConnectionStates.connecting
        } else return false;
    }

    async disconnect(){
        if(!this.isConnect()) throw new Error("not connected!")
        await this.db.disconnect()
    }
}
const defaultAddress = process.env.DB_ADDRESS;
const defaultDatabase = "log-site";

const mongo = new Mongo(defaultAddress, defaultDatabase);

export { Mongo }

const createMongo = (address: string, database: string) => {
    if(mongo.address === defaultAddress){
        mongo.address = address;
    }
    if(mongo.database === defaultDatabase){
        mongo.database = database
    }
    return mongo
}

export default createMongo