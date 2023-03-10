import prisma from "../../config/db.js";
import { credential } from "../../protocols..js";

async function getCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: {
        userId
    }
  });
};

async function getCredentialsByCredentialId(credentialId: number) {
    return await prisma.credential.findFirst({
      where: {
          id: credentialId
      }
    });
  };

async function createCredential(credential: credential) {
  return prisma.credential.create({
    data: {
        ...credential
    }
  });
};

async function deleteCredential(id: number) {
  return prisma.credential.delete({
    where: {
      id
    }
  });
};

const credentialsRepository = {
    createCredential,
    getCredentials,
    getCredentialsByCredentialId,
    deleteCredential
};

export default credentialsRepository;
