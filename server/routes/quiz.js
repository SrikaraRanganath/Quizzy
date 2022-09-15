import { Router } from 'express';
import { getQuizes, createQuiz, editQuiz, deleteQuiz } from '../controllers/quizes.js';
import authentication from '../middleware/authentication.js';

const router = Router();

router.get('/:username', authentication, getQuizes);
router.post('/', authentication, createQuiz);
router.patch('/:id', authentication, editQuiz);
router.delete('/:id', authentication, deleteQuiz);

export default router;