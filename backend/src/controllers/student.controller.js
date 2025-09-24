import {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByEmail,
  updateStudent,
  deleteStudent,
} from '../services/student.service.js';

export const createStudentController = async (req, res) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create student.' });
  }
};

export const getAllStudentsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { students, totalStudents } = await getAllStudents(page, limit);

    res.status(200).json({
      students,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students.' });
  }
};

export const getStudentByIdController = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve student.' });
  }
};

export const getMyStudentProfileController = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(400).json({ error: 'User email not found.' });
    }
    let student = await getStudentByEmail(email);
    if (!student) {
      const role = req.user?.role;
      if (role === 'student') {
        const inferredName = req.user?.name || email.split('@')[0];
        student = await createStudent({
          name: inferredName,
          email,
          age: 18,
          course: 'General',
          profilePicture: '',
        });
      } else {
        return res.status(404).json({ error: 'Student profile not found.' });
      }
    }
    return res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
};

export const updateStudentController = async (req, res) => {
  try {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update student.' });
  }
};

export const deleteStudentController = async (req, res) => {
  try {
    const deletedStudent = await deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student.' });
  }
};