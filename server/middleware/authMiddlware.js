const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const UserRepository = require('../repositories/UserRepository');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret, { expiresIn: '1h' });

    // Decoded nesnesindeki email bilgisini alıyoruz
    const email = decoded.email;
    // Daha sonra bu bilgiyi istediğiniz şekilde kullanabilirsiniz
    req.email = email;
    console.log(email);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
}

module.exports = authMiddleware;
