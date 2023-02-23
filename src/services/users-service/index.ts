import { User } from "../../protocols..js";
import userRepository from "../../repositories/users-reposity/index.js";
import bcrypt from "bcrypt";
  
  async function createUser(user: User) {
    const emailVerify = await userRepository.findUserByEmail(user.email);

    if(emailVerify) throw {name: "ConflictError", message: "email alredy exist"};

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    await userRepository.createuser(user.email, encryptedPassword);
  };
  
  const userService = {
      createUser
  };
  
  export default userService;
  