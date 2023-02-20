import { User } from "../../protocols.";
import userRepository from "../../repositories/users-reposity/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(user: User) {
  const userInfo = await userRepository.findUserByEmail(user.email);

  if(!userInfo) throw {name: "BadRequest", message: "user not found"};

  const passwordVerify = await bcrypt.compare(user.password, userInfo.password);

  if(!passwordVerify) throw {name: "BadRequest", message: "wrong password"};

  return jwt.sign({ userId: userInfo.id }, process.env.JWT_SECRET);
};

const authService = {
    signIn
};

export default authService;