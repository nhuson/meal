import { Router } from 'express'
const router = Router();
import authenticate from '../middleware/authenticate'

const asyncMiddleware = (fn) => {
  return (req, res, next) => {
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
}

// Simple routing
const pickHandler = (handlerDef) => {
  const [handlerFile, handlerMethod] = handlerDef.split('@');
  return asyncMiddleware(require(`../controllers/${handlerFile}`)[handlerMethod]);
}

// Public API
router.post('/register', pickHandler('UserController@register'));
router.post('/login', pickHandler('UserController@login'));

// Private API
router.get('/user/info', authenticate, pickHandler('UserController@info'));

export default router
