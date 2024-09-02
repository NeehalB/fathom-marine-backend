import mongoose, { mongo } from "mongoose";

const CourseSchema = mongoose.Schema;

const courseModel = new CourseSchema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model("course", courseModel);
