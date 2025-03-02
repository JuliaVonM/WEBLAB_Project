import {model, Schema} from "mongoose";
import {IRole} from "../interface/role.interface";

const roleSchema = new Schema<IRole>({
    name: {type: String, required: true},
})

export const Role = model<IRole>("Role", roleSchema);