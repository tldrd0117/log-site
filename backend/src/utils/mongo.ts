import { connect, Mongoose, ConnectionStates, set } from 'mongoose';
import dotenv from 'dotenv'
import User from '../models/user.model';
import Post from '../models/post.model';
import Setting from '../models/setting.model';
import SettingType from '../models/settingType.model';
import Role from '../models/role.model';
import { MD5, SHA256 } from 'crypto-js';
import VisitHistory from '../models/visitHistory.model';
import Visit from '../models/visit.model';
import Tag from '../models/tags.model';
import Category from '../models/category.model';

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
        await SettingType.syncIndexes()
        await Role.syncIndexes()
        await Visit.syncIndexes()
        await VisitHistory.syncIndexes()
        await Tag.syncIndexes()
        await Category.syncIndexes()
        await this.initializeRows()
    }

    async initializeRows(){
        const types = [{
            name: "site",
            uid: MD5("site").toString()
        },{
            name: "user",
            uid: MD5("user").toString()
        }]
        for(let type of types){
            await SettingType.findOneAndUpdate(type, type, {
                new: true,
                upsert: true
            });
        }
        const roles = [{
            name: "admin",
            uid: MD5("admin").toString()
        },{
            name: "user",
            uid: MD5("user").toString()
        },{
            name: "guest",
            uid: MD5("guest").toString()
        }]

        for(let role of roles){
            await Role.findOneAndUpdate(role, role, {
                new: true,
                upsert: true
            });
        }

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