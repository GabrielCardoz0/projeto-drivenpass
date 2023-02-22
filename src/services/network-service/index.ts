import { network } from "../../protocols.";
import networkRepository from "../../repositories/network-repository/index.js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.JWT_SECRET);

async function createNetwork(userId: number, network: network) {
  const networks = await networkRepository.findNetworkByUserId(userId);

  const networksTitles = networks.map(n => n.title);

  if(networksTitles.includes(network.title)) throw { name:"Conflict", message:"Title alredys exist" };

  const newNetwork = await networkRepository.createNetwork(userId, { ...network, password: cryptr.encrypt(network.password) });

  return { ...newNetwork, password: cryptr.decrypt(newNetwork.password) };
};

async function getNetworks(userId: number) {
  const networks = await networkRepository.findNetworkByUserId(userId);

  return networks.map(n => {
    return { ...n, password: cryptr.decrypt(n.password) };
  });
};

async function getNetworkByNetworkId(userId: number, networkId: number) {
  const network = await networkRepository.findNetworkByNetworkId(networkId);  
  
  if(!network || network.userId !== userId) throw {name: "NotFoundError", message:"Not found network"};

  return { ...network, password: cryptr.decrypt(network.password) };
};

const networkService = {
    createNetwork,
    getNetworks,
    getNetworkByNetworkId
};

export default networkService;
