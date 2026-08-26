import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.ts";

const databaseUrl = new URL(process.env.DATABASE_URl);

const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.replace("/", ""),
});

const prisma = new PrismaClient({
    adapter,
});

export { prisma };