import express from 'express';
import {getCategories, getCategoryById} from "../controllers/category.controller";
import {authenticateToken} from "../middleware/middleware";

const router = express.Router();


router.get("", authenticateToken, getCategories);
router.get("/:id", authenticateToken, getCategoryById);

export default router;