import {model, Schema} from "mongoose";
import {ITechnology} from "../interface/technology.interface";

const technologySchema = new Schema<ITechnology>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    ring: {type: Schema.Types.ObjectId, ref: "Ring"},
    description_ring: {type: String},
    publicationDate: {type: Date},
    published: {type: Boolean, default: false},
}, { timestamps: true })

export const Technology = model<ITechnology>("Technology", technologySchema);