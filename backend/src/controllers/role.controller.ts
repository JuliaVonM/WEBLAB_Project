import {Request, Response} from "express";
import {Role} from "../models/role.model";

export const getRoles = (req: Request, res: Response) => {
    Role.find()
    .then((roles) => res.json(roles))
    .catch((error) => res.status(500).json({message: "Server error", error}));
};
