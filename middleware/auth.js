const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log('TOKEN', req.headers)

  const token  = req.headers.token;

  // console.log(token)

  if (!token) {
    return res.status(402).json({message: "Token Missing"});
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    return next()
  } catch (error) {
    res.status(403).send("token is invalid");
  }

};

module.exports = auth