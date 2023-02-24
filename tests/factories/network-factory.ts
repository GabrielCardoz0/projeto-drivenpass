import prisma from "../../src/config/db.js";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.JWT_SECRET);

export async function createNetworkByUserId(userId: number) {
  const fakePassword = faker.internet.password(10);

  const network = await prisma.network.create({
    data: {
        title: faker.internet.email(),
        network: faker.internet.userName(),
        password: cryptr.encrypt(fakePassword),
        userId
        }
    });

    return network;
};