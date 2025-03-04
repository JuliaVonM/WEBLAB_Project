import express from 'express';
import {
    createTechnology,
    deleteTechnology,
    getTechnologies,
    getTechnologyById,
    updateTechnology
} from "../controllers/technology.controller";
import {authenticateToken, checkRole} from "../middleware/middleware";

const router = express.Router();


router.get('', authenticateToken, getTechnologies);
router.get('/:id', authenticateToken, getTechnologyById);
router.post('', authenticateToken, checkRole(['CTO', 'Tech-Lead']), createTechnology);
router.patch('/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), updateTechnology);
router.delete('/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), deleteTechnology);

export default router;