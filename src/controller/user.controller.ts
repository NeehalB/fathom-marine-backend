import { Request, Response } from "express";
import userModel from "../model/user.model";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../common/utils";
import courseModel from "../model/course.model";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "User already exist.",
      });
    }

    const userData = new userModel({
      first_name,
      last_name,
      email,
      password,
    });

    userData.save();

    if (userData) {
      return res.status(200).json({
        message: "User added successfully!",
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

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email: email });

    if (!userData) {
      return res.status(400).json({
        message: "User doesn't exist.",
      });
    }

    if (!(password === userData.password)) {
      return res.status(400).json({
        message: "Invalid credential.",
      });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign(
      { userId: userData._id, email: userData.email },
      secretKey,
      { expiresIn: "7h" }
    );

    return res.status(200).json({
      token: token,
      data: userData,
      message: "Logged in successfully!",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const updateUserMood = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const { mood } = req.body;

    if (!token) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
    const { userId } = jwtPayload(token);

    const userData = await userModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: { mood },
      }
    );

    if (userData.acknowledged) {
      return res.status(201).json({
        message: "Mood updated successfully.",
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

export const updateWatchedVideo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.query;

    if (!token) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
    const { userId } = jwtPayload(token);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user && user.watchedVideo && user.watchedVideo.includes(id)) {
      return res.status(200).json({
        message: "Video is already in the watched list.",
      });
    }

    const userData = await userModel.updateOne(
      {
        _id: userId,
      },
      {
        $push: { watchedVideo: id },
      }
    );

    if (userData.acknowledged) {
      return res.status(201).json({
        message: "Watched list updated successfully.",
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

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const courseData = await courseModel.find();

    const { userId } = jwtPayload(token);

    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(400).json({
        message: "User doesn't exist.",
      });
    }

    const watchedVideo =
      (userData && userData.watchedVideo && userData.watchedVideo.length) || 0;
    const unwatchedVideo = courseData.length - watchedVideo;

    return res.status(200).json({
      watchedVideo,
      unwatchedVideo,
      mood: userData?.mood,
      message: "Data found successfully!",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};
