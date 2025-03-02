import express from "express";
import {getUsers, login} from "../controllers/user.controller";

const router = express.Router();


router.post("", login);
router.get("/users", getUsers);

export default router;