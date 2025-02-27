import {Category} from "../models/category.model";
import {Request, Response} from "express";

// Get all categories
export const getCategories = (req: Request, res: Response) => {
    Category.find()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).json({message: "Server error", error}));
};

// Get a single category by ID
export const getCategoryById = (req: Request, res: Response) => {
    Category.findById(req.params.id)
    .then((category) => {
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    })
    .catch((error) => res.status(500).json({ message: "Server error", error }));
};