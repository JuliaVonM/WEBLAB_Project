import {model, Schema} from "mongoose";
import {ICategory} from "../interface/category.interface";

const categorySchema = new Schema<ICategory>({
    name: {type: String, required: true}
})

export const Category = model<ICategory>("Category", categorySchema);