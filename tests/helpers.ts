import prisma from "../src/config/db.js";
import { User } from "../src/protocols..js";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

export async function cleanDb() {
  await prisma.credential.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
};

export async function generateValidToken(user: User) {
  const token = jwt.sign(user.email, process.env.JWT_SECRET);

  return token;
};

export function generateValidBody() :User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(10)
  }
}