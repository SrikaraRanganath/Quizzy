import { Router } from 'express';
import { getQuiz } from '../controllers/quiz.js';

const router = Router();

router.get('/:id', getQuiz);

export default router;