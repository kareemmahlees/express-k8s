import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import { postRouter } from "./routes/post/post";
import { passport } from "./auth";
import { authRouter } from "./routes/auth/auth";
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.get("/health-check", (req: Request, res: Response) => {
    return res.json({ status: "healthy" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});
