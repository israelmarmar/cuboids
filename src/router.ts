import { Request, Response, Router } from 'express';
import * as users from './controllers/users';

const router = Router();

router
  .get('/', (req: Request, res: Response) => res.send('Jobs'))
  .get('/users', users.list)
  .get('/users/:id', users.get)
  .post('/users', users.create)
  .patch('/users', users.update)
  .delete('/users/:id', users.remove);

export default router;
