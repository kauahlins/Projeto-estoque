import { Router } from 'express';
import { getProducts, createProduct, Updateproduct, Deleteproduct, Patchproduct } from '../controllers/Productcontroller.js';

const routes = Router();

routes.get("/login", (req, res) => {
    return res.status(200).json({
        message: "vocé esta no login",
    });
});

routes.get("/products", getProducts);

routes.post("/products", createProduct);

routes.put("/products/:id/:user_Id", Updateproduct)

routes.delete("/products/:id/:user_Id", Deleteproduct)

routes.patch("/product/:id/user_Id", Patchproduct)

export { routes };