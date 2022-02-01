require("dotenv").config();
import cors from "./src/tools/cors";
import express, { Application } from "express";
import UserResolver from "./src/service/userServices/resolver";
import LiveScoreResolver from "./src/service/liveScoreServices/resolver";
import Db from "./src/db";
import cookieParser from 'cookie-parser'

const app: Application = express();
const devOrigins: Array<string> = ["http://localhost:4000"];
const Origins: Array<string> = [""];
const isDev: any = process.env.NODE_ENV || "development";
if (isDev) {
  Origins.push(...devOrigins);
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser())
app.use(cors(Origins));
app.use("/api/user", UserResolver);
app.use("/api/livescores", LiveScoreResolver);
const PORT: any = process.env.PORT;
new Db(console).connect(process.env.DB_URL);

app.listen(PORT, () => {
  console.log(`livescores application is running on port ${PORT}.`);
});
