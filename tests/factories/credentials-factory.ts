import prisma from "../../src/config/db.js";
import { faker } from "@faker-js/faker";
import { credential } from "../../src/protocols..js";
import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.JWT_SECRET);

export async function createCredential(userId: number) {
  const fakePassword = faker.internet.password()

  return prisma.credential.create({
    data: {
        url: faker.internet.url(),
        title: faker.internet.email(),
        username: faker.internet.userName(),
        password: cryptr.encrypt(fakePassword),
        userId
        }
    });
}