import { connect, Mongoose, ConnectionStates, set } from 'mongoose';
import dotenv from 'dotenv'
import User from '../models/user.model';
import Post from '../models/post.model';
import Setting from '../models/setting.model';

set("strictQuery", false)
set('debug', true);

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
        await User.syncIndexes()
        await Post.syncIndexes()
        await Setting.syncIndexes()
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

export { Mongo }

const createMongo = (address?: string, database?: string) => {
    if(!address){
        address = defaultAddress
    }
    if(!database){
        database = defaultDatabase
    }
    return new Mongo(address, database);
}

export default createMongo