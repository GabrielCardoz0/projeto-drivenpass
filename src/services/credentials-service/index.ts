import { credential } from "../../protocols..js";
import credentialsRepository from "../../repositories/credentials-repository/index.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function getCredentials(userId: number) {
  const credentials = await credentialsRepository.getCredentials(userId);

  if(credentials.length < 1) throw {name: "NotFoundError", message: "credential list not found"};

  const credentialsList = credentials.map(c => {
    return {...c, password: cryptr.decrypt(c.password)}
  });

  return credentialsList;
};

async function getCredentialsByCredentialId(userId: number, credentialId: number) {
  const credential = await credentialsRepository.getCredentialsByCredentialId(credentialId);

  if(!credential) throw {name: "NotFoundError", message: "credential not found"};

  if(credential.userId !== userId) throw {name: "UnauthorizedError", message: "wrong userId"};

  return { ...credential, password: cryptr.decrypt(credential.password) };
};

async function createCredential(userId: number, credential: credential) {
  const credentialsList = await credentialsRepository.getCredentials(userId);

  const titleList = credentialsList.map(o => o.title);

  if(titleList.includes(credential.title)){
    throw { name:"ConflictError", message:"Credential title alredy exist" };
  }

  const newCredential = await credentialsRepository.createCredential({...credential, password: cryptr.encrypt(credential.password), userId});

  return {...newCredential, password: cryptr.decrypt(newCredential.password)}
};

async function deleteCredential(userId: number, credentialId: number) {
  const credential = await credentialsRepository.getCredentialsByCredentialId(credentialId);

  if(!credential) {
    throw { name: "NotFoundError", message: "Credential NotFound" };
  };

  if(userId !== credential.userId) {
    throw { name: "UnauthorizedError", message: "Unauthorized, wrong userId" };
  };

  return await credentialsRepository.deleteCredential(credentialId);
};

const credentialsService = {
    createCredential,
    getCredentials,
    getCredentialsByCredentialId,
    deleteCredential
};

export default credentialsService;