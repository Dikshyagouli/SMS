import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from '../controllers/student.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import { getMyStudentProfileController } from '../controllers/student.controller.js';

const router = Router();

const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(5).required(),
  course: Joi.string().required(),
 profilePicture: Joi.string().uri().allow(null).allow('').optional(), 
});

router.post('/', protect, admin, celebrate({ [Segments.BODY]: studentSchema }), createStudentController);
router.get('/', protect, admin, getAllStudentsController);
router.get('/me/profile', protect, getMyStudentProfileController);
router.get('/:id', protect, admin, getStudentByIdController);
router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: studentSchema,
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  }), protect, admin,
  updateStudentController,
);
router.delete('/:id', protect, admin, deleteStudentController);

export default router;