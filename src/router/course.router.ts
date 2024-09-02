import express from "express";
import auth from "../middleware/auth.middleware";
import {
  addCourseContent,
  getAllCourseContent,
} from "../controller/course.controller";

const courseRouter = express.Router();

courseRouter.get("/", auth, getAllCourseContent);
courseRouter.post("/", auth, addCourseContent);

export default courseRouter;
