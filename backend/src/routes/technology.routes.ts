import express from 'express';
import {
    createTechnology, deleteTechnology, getPublishedTechnologies,
    getTechnologies, getTechnologyById,
    publishTechnology, updateRingOfTechnology, updateTechnology
} from "../controllers/technology.controller";
const router= express.Router();


router.get('', getTechnologies);
router.get('/published', getPublishedTechnologies);
router.get('/:id', getTechnologyById);
router.post('', createTechnology);
router.put('/publish/:id', publishTechnology);
router.put('/ring/:id', updateRingOfTechnology);
router.put('/:id', updateTechnology);
router.delete('/:id', deleteTechnology);

export default router;