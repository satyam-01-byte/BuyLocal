import jwt from "jsonwebtoken";
//session id genaration
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export default generateToken;
