import {Request, Response} from "express";
import {Ring} from "../models/ring.model";

// Get all rings
export const getRings = (req: Request, res: Response) => {
    Ring.find()
    .then((rings) => res.json(rings))
    .catch((error) => res.status(500).json({message: "Server error", error}));
};

// Get a single ring by ID
export const getRingById = (req: Request, res: Response) => {
    Ring.findById(req.params.id)
    .then((ring) => {
        if (!ring) {
            return res.status(404).json({ message: "Ring not found" });
        }
        res.json(ring);
    })
    .catch((error) => res.status(500).json({ message: "Server error", error }));
};