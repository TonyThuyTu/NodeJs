import jwt from "jsonwebtoken";
import "dotenv"; // import dotenv to use process.env

class Auth {
  static createJWTToken(email) {
    const payLoad = {
      email: email,
    };

    const options = {
      expiresIn: "2h",
      algorithm: "HS256",
    };

    const token = jwt.sign(payLoad, process.env.SECRET_KEY, options);
    console.log(`Token: ${token}`);
    return token;
  }

  // verify token
  static verifyJWTToken = (req, res, next) => {
    // get token from http header Authorization
    let token = null;
    const authHeader = req.headers["authorization"];
    console.log(`AuthHeader: ${authHeader}`);
    if (authHeader != null) {
      token = authHeader && authHeader.split(" ")[1];
      console.log(`Token from Header: ${token}`);
    } else {
      // get token from http cookie
      token = req.cookies.token;
      console.log(`Token from Cookie: ${token}`);
    }
    if (token == null) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
      } else {
        console.log(`Decoded: ${decoded}`);
        req.email = decoded.email;
        console.log(`Email: ${req.email}`);
        next();
      }
    });
  };

  // check permission based on user's role
  static checkPermission = (role) => {
    if (role == "admin") {
    } else {
    }
  };
}

export default Auth;
