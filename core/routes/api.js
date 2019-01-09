import { Router } from 'express'
const router = Router();
import auth from '../middleware/auth'

const asyncMiddleware = (fn) => {
  return (req, res, next) => {
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
}

const pickHandler = (handlerDef) => {
  const [handlerFile, handlerMethod] = handlerDef.split('@');
  return asyncMiddleware(require(`../controllers/${handlerFile}`)[handlerMethod]);
}


//all routes are here
router.post('/auth/signup', pickHandler('auth.controller@signup'));
router.post('/atuh/login', pickHandler('auth.controller@login'));
router.post('/atuh/forgot-password', pickHandler('auth.controller@forgotPassword'));
router.post('/atuh/reset-password', pickHandler('auth.controller@resetPassword'));
export default router
