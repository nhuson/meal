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
router.post('/register', pickHandler('user.controller@register'));
router.post('/login', pickHandler('user.controller@login'));
router.get('/user/info', pickHandler('user.controller@info'));

export default router
