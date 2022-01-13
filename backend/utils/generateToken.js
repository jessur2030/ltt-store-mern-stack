import jwt from "jsonwebtoken";

//generate our jwt token
//generateToken: takes id as the payload in this token
const generateToken = (id) => {
  //jwt.sign: payload an object as: id,
  //our secret as second argument
  //and third argument of options: we set our token to expire in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
