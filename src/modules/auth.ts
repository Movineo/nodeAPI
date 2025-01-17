import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const comparePassword =  (password, hash) => {
    return  bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return  bcrypt.hash(password, 10);
}



export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username},
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
  
    if (!bearer) {
      res.status(401);
      res.send("Not authorized");
      return;
    }
  
    const [, token] = bearer.split(" ");
    if (!token) {
      res.status(401);
      res.send("Not valid token");
      return;
    }
  
    try {
      const user= jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
      return;
    } catch (e) {
      console.error(e);
      res.status(401);
      res.send("Not valid token");
      return;
    }
  };