
const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = (req, res) => {
  let token = req.headers["authorization"];
  token = token.slice(7, token.length);
  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          msg: "token is invalid",
        });
      } else {
        return res.json({
          status: true,
          decoded,
        });
      }
    });
  } else {
    return res.json({
      status: false,
      msg: "Token is not provided",
    });
  }
};