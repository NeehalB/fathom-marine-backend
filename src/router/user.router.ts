import express from "express";
import {
  addUser,
  getDashboardData,
  signInUser,
  updateUserMood,
  updateWatchedVideo,
} from "../controller/user.controller";
import auth from "../middleware/auth.middleware";

const userRouter = express.Router();

userRouter.post("/add-user", auth, addUser);
userRouter.post("/login", signInUser);
userRouter.post("/mood", updateUserMood);
userRouter.put("/watched", updateWatchedVideo);
userRouter.get("/", getDashboardData);

export default userRouter;
