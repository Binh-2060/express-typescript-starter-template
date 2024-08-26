import { Router } from 'express';
import * as Controller from './controller';
const router = Router();

router.get('/get-all-data', Controller.GetUserController);
router.post('/new-user', Controller.CreateUserController);
export default router;
