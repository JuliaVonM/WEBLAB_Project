import {Types} from "mongoose";

export interface ITechnology {
    __id?: string;
    name: string;
    description: string;
    category: Types.ObjectId;
    ring?: Types.ObjectId;
    description_ring?: string;
    publicationDate?: Date;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}