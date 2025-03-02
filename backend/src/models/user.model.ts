import {model, Schema} from "mongoose";
import {IUser} from "../interface/user.interface";

const userSchema = new Schema<IUser>({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: Schema.Types.ObjectId, ref: "Role"}
})

export const User = model<IUser>("User", userSchema);