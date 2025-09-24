import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/databaseConnect.js';
import studentRoutes from './routes/student.routes.js';
import { errors } from 'celebrate';
import uploadRoutes from './routes/upload.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';

console.log('JWT Secret from .env:', process.env.JWT_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.use(errors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
