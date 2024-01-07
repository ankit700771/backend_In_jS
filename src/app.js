import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

//routes

import userRouter from "./routes/user.routes.js";

//routes declaration

//here we can't directly use app.get or app.post becouse here router are define
//any where else we need to give the path like userRoutes then it goes in
//that file and when hit /register rotes then controller will call that why we use
//middlewere

//http://localhost:8000/api/v1/users/register => then get controller
app.use("/api/v1/users", userRouter);

export { app };
