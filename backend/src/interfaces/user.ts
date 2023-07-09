import { Types } from "mongoose";

export interface UserJoin{
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface UserLogin{
    email: string;
    password: string;
}