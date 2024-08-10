import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.routes";
import instanceDB from "./database/init.mongodb";
import helmet from "helmet";
const PORT = 3055;

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// DB
instanceDB;

routes(app);

app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});

// hanndller error
interface ErrorResponse extends Error {
    status?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
    const err: ErrorResponse = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json({
        code: err.status || 500,
        msg: err.message || "Internal Server",
    });
});
