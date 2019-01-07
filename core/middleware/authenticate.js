import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const authenicate = (req, res, next) => {
   if (!req.headers || !req.headers.authorization) {
    throw new createError(401, `Unauthorized token!`)
  }

  let token = req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err || !decodedToken) {
      throw new createError(401, err)
    }

    let now = Date.now() / 1000;
    if (decodedToken.exp < now) {
      throw new createError(401, "Unauthorized.")
    }

    req.user = decodedToken.data;
    next();

  });
}

export default authenicate
