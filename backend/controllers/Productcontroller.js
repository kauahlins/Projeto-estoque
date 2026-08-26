
import { prisma } from "../prisma/lib/prisma.js";

export async function getProducts(req, res) {
    const products = await prisma.products.findMany();

    return res.status(200).json(products);
}

export async function createProduct(req, res) {
    const { name, category, price, available, user_id } = req.body

    const product = await prisma.products.create({
        data: {
            name,
            category,
            price,
            available,
            user_id,
        },
    });
    return res.status(202).json(product);

}

export async function Updateproduct(req, res) {
    const { id, user_Id } = req.params;
    const { name, category, price, available } = req.body

    const product = await prisma.products.update({
        where: {
            product_id_user_id: {
                product_id: Number(id),
                user_id: Number(user_Id)
            }
        },
        data: {
            name,
            category,
            price,
            available
        }
    });
    return res.status(200).json(product);
}

export async function Deleteproduct(req, res) {
    const { id, user_Id } = req.params;
    const { name, category, price, available } = req.body

    const product = await prisma.products.delete({
        where: {
            product_id_user_id: {
                product_id: Number(id),
                user_id: Number(user_Id)
            }

        }
    });
    return res.status(204).send();
}

export async function Patchproduct(req, res) {
    const { id, user_Id } = req.params;
    const { name, category, price, available } = req.body

    const data = {};

    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (price !== undefined) data.price = price;
    if (available !== undefined) data.available = available;

    const product = await prisma.products.update({
        where: {
            product_id_user_id: {
                product_id: Number(id),
                user_id: Number(user_Id)
            }
        },
        data
    });
    return res.status(200).json(product)
}
