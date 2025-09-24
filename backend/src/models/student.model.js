import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true,     
    },
    email: {
      type: String,
      required: true,
      unique: true,   
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 5,   
      max: 100, 
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: String, 
      required: false, 
    },
  },
  { timestamps: true } );

const Student = mongoose.model("Student", studentSchema);

export default Student;
