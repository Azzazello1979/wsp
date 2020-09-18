const { error } = require("@angular/compiler/src/util");
// checks:
//
// use on endpoints where the request must be coming from
// a logged in (authenticated) user that has valid and non-expired token
//
// 1. existence of token in req.headers
// 2. validity of token ... jwt.verify()
// 3. expiration of token

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const tokenControl = (req, res, next) => {
  // 1. do we have authorization header? if not, you will get 'jwt malformed error'.
  if (req.headers.authorization) {
    // 2. remove "Bearer" word.
    let tokenCut = req.headers.authorization.slice(
      7,
      req.headers.authorization.length
    );
    // 3. run verify() method of jsonwebtoken, failure: get error, success: get decoded token obj.
    jwt.verify(tokenCut, SECRET, (err, verifiedUnpackedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "token verification failed", details: err });
      } else {
        // 4. verification passed: check expiry
        let expires = verifiedUnpackedToken.exp;
        let currentTimeStamp = Date.now() / 1000;

        if (expires < currentTimeStamp) {
          // TODO: implement renewal of token
          console.log("expired");
        } else {
          return next(); // all ok, let request pass ...
        }
      }
    });
  } else {
    return res.status(401).json({ message: "authorization header missing!" });
  }
};

module.exports = tokenControl;
