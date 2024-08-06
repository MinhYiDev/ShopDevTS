import { Application } from "express";

import accessRouter from "./access/access.routes";
import netRouter from "./net/net.routes";

function routes(app: Application) {
    app.use("/v1/api/shop", accessRouter);
    app.use("/", netRouter);
}

export default routes;
