import prisma from "../src/config/db.js";
import { User } from "../src/protocols..js";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

type UserWithId = {
  email: string,
  password: string,
  id: number | string
}

export async function cleanDb() {
  await prisma.credential.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
};

export async function generateValidToken(user: UserWithId) {
  const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET);

  return token; 
};

export function generateValidBody() :User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(10)
  }
}