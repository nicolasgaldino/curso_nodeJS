import express from 'express';
import TaskController from '../controllers/TaskController.js';
const router = express.Router();

router.get("/add", TaskController.createTask);
router.post("/add", TaskController.createTaskSave);
router.post("/remove", TaskController.removeTask);
router.get("/edit/:id", TaskController.updateTask);
router.get("/", TaskController.showTasks);

export default router;
