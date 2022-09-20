import { Router } from 'express';
import { router as v1Router } from './v1/index';

const routes = Router();

routes.use('/v1', v1Router);

export { routes };
