import {Types} from "mongoose";

export interface IUser {
    __id?: string;
    email: string;
    password: string;
    role: Types.ObjectId;
}