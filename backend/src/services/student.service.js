import Student from '../models/student.model.js';

export const createStudent = async (studentData) => {
  const newStudent = new Student(studentData);
  return await newStudent.save();
};

export const getAllStudents = async (page, limit) => {
  console.log("Fetching students for page", page, "with limit", limit);

  const students = await Student.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const totalStudents = await Student.countDocuments();

  return { students, totalStudents };
};

export const getStudentById = async (id) => {
  return await Student.findById(id);
};

export const getStudentByEmail = async (email) => {
  return await Student.findOne({ email });
};

export const updateStudent = async (id, studentData) => {
  return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
};

export const deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
