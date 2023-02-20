import prisma from "../../config/db.js";

async function getCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: {
        userId
    }
  });
};

const credentialsRepository = {
    getCredentials
};

export default credentialsRepository;