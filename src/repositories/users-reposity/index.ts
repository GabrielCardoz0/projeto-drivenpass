import prisma  from "../../config/db.js";

async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
        email
    }
  });
};

const userRepository = {
    findUserByEmail
};

export default userRepository;
