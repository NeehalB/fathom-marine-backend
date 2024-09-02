import { Response, Request } from "express";
import courseModel from "../model/course.model";

export const getAllCourseContent = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const searchCondition = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const courseData = await courseModel.find(searchCondition);

    if (!courseData) {
      return res.status(400).json({
        message: "Unable to find data.",
      });
    }

    return res.status(200).json({
      data: courseData,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const addCourseContent = async (req: Request, res: Response) => {
  try {
    const { title, link } = req.body;

    if (!title && !link) {
      return res.status(400).json({
        message: "Enter correct data.",
      });
    }

    const courseData = new courseModel({
      title,
      link,
    });

    courseData.save();

    if (courseData) {
      return res.status(200).json({
        message: "Course added successfully!",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};
