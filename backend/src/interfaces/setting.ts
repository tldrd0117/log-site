import { Types } from "mongoose";

export interface SettingUpdate{
    _id: Types.ObjectId
    type?: Types.ObjectId
    role?: Types.ObjectId;
    userId?: Types.ObjectId;
    name?: string;
    value?: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface SettingUpdateList{
    list: Array<SettingUpdate>
}

export interface SettingCreate{
    type: string
    role?: string;
    userId?: string;
    name: string;
    value: string;
}

export interface SettingsDelete{
    ids: Array<string>
}

export interface SettingGetList{
    limit: number;
    offset: number;
}