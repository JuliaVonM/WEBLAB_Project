import express from 'express';
import {getRingById, getRings} from "../controllers/ring.controller";
const router= express.Router();


router.get("", getRings);
router.get("/:id", getRingById);

export default router;