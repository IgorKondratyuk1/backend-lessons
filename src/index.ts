// 03_lesson-rest-api
import express from 'express';
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {adressesRouter} from "./routes/addresses-router";
import {testRouter} from "./routes/test";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/addresses", adressesRouter);
app.use("/products", productsRouter);

app.use("/test", testRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});