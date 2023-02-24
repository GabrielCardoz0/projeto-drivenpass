import prisma from "../../src/config/db.js";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export async function createUser() {
  const password = faker.internet.password(10);

  const hashPassword = await bcrypt.hash( password, 10);

  const email = faker.internet.email();

  const user = await prisma.user.create({
    data: {
        email,
        password: hashPassword
    }
  });

  return { ...user, password };
};