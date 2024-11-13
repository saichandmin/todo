const jwt = require("jwt-simple");
const secret = "your-secret-key";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.decode(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authenticate;
