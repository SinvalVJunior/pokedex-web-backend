
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config');

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token.toString(), jwtSecret);
    res.locals.jwtPayload = jwtPayload; 
    const { id } = jwtPayload;
    const newToken = jwt.sign({ id }, jwtSecret, {
      expiresIn: '1h'
    });
    res.setHeader('token', newToken);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
  next();
}

module.exports = checkJwt;