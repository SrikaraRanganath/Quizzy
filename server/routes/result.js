import { Router } from 'express';
import { submitResult } from '../controllers/results.js';

const router = Router();

router.post('/:id', submitResult);

export default router