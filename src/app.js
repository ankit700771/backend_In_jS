import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//cors are used to allow the origin means who can access
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//for getting data in json format
app.use(express.json({ limit: "16kb" }));

//getting data from the url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//save fils in public folder
app.use(express.static("public"));

//for handling cookie
app.use(cookieParser());

//routes

// we assign own name when we use export defoult
import userRouter from "./routes/user.routes.js";

//routes declaration

//here we can't directly use app.get or app.post becouse here router are define
//any where else we need to give the path like userRoutes then it goes in
//that file and when hit /register rotes then controller will call that why we use
//middlewere

//http://localhost:8000/api/v1/users/register => then get controller
app.use("/api/v1/users", userRouter);

export { app };
