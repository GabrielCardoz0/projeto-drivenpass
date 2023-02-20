import credentialsRepository from "../../repositories/credentials-repository/index.js";

async function getCredentials(userId: number) {
  const credentials = await credentialsRepository.getCredentials(userId);

  return credentials;
};

const credentialsService = {
    getCredentials
};

export default credentialsService;