import {Request, Response} from "express";
import {User} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response) => {
    const {email, password} = req.body;

    User.findOne({email: email})
    .then((user) => {
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('False password');
        }

        const token = jwt.sign({
            email: user.email,
            role: user.role
        }, 'secretkey', {expiresIn: '1h'});

        res.json({token});
    })
    .catch((error) => res.status(500).json({message: "Server error", error}));
};

// Get all users
export const getUsers = (req: Request, res: Response) => {
    User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({message: "Server error", error}));
};


