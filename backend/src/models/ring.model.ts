import {model, Schema} from "mongoose";
import {IRing} from "../interface/ring.interface";

const ringSchema = new Schema<IRing>({
    name: {type: String, required: true},
    description: {type: String, required: true}
})

export const Ring = model<IRing>("Ring", ringSchema);