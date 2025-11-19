import * as StudentController from '../controllers/StudentController.js';
import express from "express";
import checkToken from "../middleware/authenticationhandler.js";

const studentRoutes = express.Router();
studentRoutes.use(checkToken);
studentRoutes.get('/all', StudentController.fetchStudents);
studentRoutes.post('/new', StudentController.addStudent);
studentRoutes.put('/edit/:studentId', StudentController.editStudent);
studentRoutes.delete('/delete/:studentId', StudentController.deleteStudent);

export default studentRoutes;