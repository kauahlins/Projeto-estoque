
import { prisma } from "./prisma/lib/prisma.js";

async function main() {
    const resultado = await prisma.$queryRaw`SELECT 1 AS conectado`;

    console.log("conexão com MySQL funcionando!");
    console.log(resultado);

}

main()
    .catch((error) => {
        console.error("error ao conectar ao MySQl");
        console.error(error);

    })
    .finally(async () => {
        await prisma.$disconnect();
    });