import jwt from "jsonwebtoken";
/**
 * whenever user signs in or a new user signs in we create a token.
 * after creating token we store that token in a cookie
 *
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 100,
  });
};

export default generateToken;
