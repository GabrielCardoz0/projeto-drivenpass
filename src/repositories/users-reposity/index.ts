import prisma  from "../../config/db.js";
import { User } from "../../protocols..js";

async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
        email
    }
  });
};

async function createuser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password      
    }
  });
}

const userRepository = {
    findUserByEmail,
    createuser
};

export default userRepository;
