import express from 'express';
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {adressesRouter} from "./routes/addresses-router";
import {testRouter} from "./routes/test-router";
import {connectToDB} from "./repositories/db";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth";

export const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    UNAUTHORIZED_401 = 401,
    NOT_FOUND_404 = 404
}

app.use("/products", productsRouter);
app.use("/addresses", adressesRouter);
app.use("/test", testRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const startApp = async () => {
    await connectToDB();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
}

startApp();