import express from 'express';
import {getRingById, getRings} from "../controllers/ring.controller";
import {authenticateToken} from "../middleware/middleware";

const router = express.Router();


router.get("", authenticateToken, getRings);
router.get("/:id", authenticateToken, getRingById);

export default router;