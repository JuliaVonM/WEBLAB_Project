import express from 'express';
import {
    createTechnology, deleteTechnology, getPublishedTechnologies,
    getTechnologies, getTechnologyById,
    publishTechnology, updateRingOfTechnology, updateTechnology
} from "../controllers/technology.controller";
import {authenticateToken, checkRole} from "../middleware/middleware";

const router = express.Router();


router.get('', authenticateToken, checkRole(['CTO', 'Tech-Lead']), getTechnologies);
router.get('/published', authenticateToken, getPublishedTechnologies);
router.get('/:id', authenticateToken, getTechnologyById);
router.post('', authenticateToken, checkRole(['CTO', 'Tech-Lead']), createTechnology);
router.put('/publish/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), publishTechnology);
router.put('/ring/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), updateRingOfTechnology);
router.put('/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), updateTechnology);
router.delete('/:id', authenticateToken, checkRole(['CTO', 'Tech-Lead']), deleteTechnology);

export default router;