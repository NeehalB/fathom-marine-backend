import express from "express";
import userRouter from "./user.router";
import courseRouter from "./course.router";

const indexRouter = express();

indexRouter.use("/user", userRouter);
indexRouter.use("/course", courseRouter);

export default indexRouter;
