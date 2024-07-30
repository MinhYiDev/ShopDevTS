import { Application } from "express";

import accessRouter from "./access/access.routes";

function routes(app: Application) {
    app.use("/v1/api/shop", accessRouter);
}

export default routes;
