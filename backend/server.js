
import express from "express"
import {routes} from "./routes/index.js"

const app = express();
const port = 3000;

app.use(express.json())
app.use(routes);

app.listen(port, () => {
    console.log(`servidor iniciado na porta ${port}`);
});