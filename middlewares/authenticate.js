const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  const { id } = jwt.sign(token, SECRET_KEY);
  const client = next();
  try {
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
