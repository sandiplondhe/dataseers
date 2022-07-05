const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];

  if (!token) {
    return res.status(200).send({
      error: `'Token required for authentication'`,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send("Invalid token");
  }
  return next;
};
module.exports = verifyToken;
