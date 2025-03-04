import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import {Role} from "../models/role.model";

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

export function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send('No token available');
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            return res.status(401).send('Ungültiges Token');
        }
        req.user = user;
        next();
    });
}

export function checkRole(roles) {
    return (req, res, next) => {
        Role.findOne({_id: req.user.role})
        .then(
            (role) => {
                if (!roles.includes(role.name)) {
                    return res.status(403).send('Access denied');
                }
            }
        )
        next();
    };
}