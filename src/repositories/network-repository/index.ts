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

const networkRepository = {
    findNetworkByUserId,
    createNetwork,
};

export default networkRepository;
