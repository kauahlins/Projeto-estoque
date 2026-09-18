
import { prisma } from "./prisma/lib/prisma.js";


console.log(process.env.DATABASE_URL)

async function main() {
    const resultado = await prisma.$queryRaw`SELECT 1 AS conectado`;

    console.log("conexão com MySQL funcionando!");
    console.log(resultado);
    console.log(process.env.DATABASE_URL)

}

main()
    .catch((error) => {
        console.error("error ao conectar ao MySQl");
        console.error(error);

    })
    .finally(async () => {
        await prisma.$disconnect();
    });