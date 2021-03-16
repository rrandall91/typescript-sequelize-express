import http, { Server } from "http";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import router from "./router";

const PORT: string = process.env.PORT || "80";
const ENV: string = process.env.NODE_ENV || "development";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(router);

const server: Server = http.createServer(app);

server.listen(PORT, () => console.info(`[${ENV}] Listening on port: ${PORT}`));

export default server;