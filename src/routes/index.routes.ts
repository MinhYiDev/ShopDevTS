import { Application } from "express";
import express from "express";
const app: Application = express();
import helmet from "helmet";
import accessRouter from "./access/access.routes";
import netRouter from "./net/net.routes";
import testRouter from "./test/test.route";

app.use(helmet());

function routes(app: Application) {
    app.use("/v1/api/shop", accessRouter);
    app.use("/v1/api/net", netRouter);
    app.use("/onedrive", testRouter);
}

export default routes;
