import prisma from "../../config/db.js";
import { network } from "../../protocols.";

async function findNetworkByUserId(userId) {
  return prisma.network.findMany({
    where: {
        userId
    }
  });
}

async function createNetwork(userId: number, network: network) {
  return prisma.network.create({
    data: {
        ...network,
        userId
    }
  });
};

async function findNetworkByNetworkId(id: number) {
  return prisma.network.findFirst({
    where: {
        id
    }
  });
}

async function deleteNetworkyNetworkId(id: number) {
  return prisma.network.delete({
    where: {
      id
    }
  });
}

const networkRepository = {
    findNetworkByUserId,
    createNetwork,
    findNetworkByNetworkId,
    deleteNetworkyNetworkId
};

export default networkRepository;
