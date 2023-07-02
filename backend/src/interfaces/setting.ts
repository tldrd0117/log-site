import { Types } from "mongoose";

export interface SettingUpdate{
    _id: Types.ObjectId
    type?: string
    role?: string;
    userId?: Types.ObjectId;
    name?: string;
    value?: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface SettingCreate{
    type: string
    role: string;
    userId: string;
    name: string;
    value: string;
}