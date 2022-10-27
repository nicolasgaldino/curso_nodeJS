import Task from "../models/Task";

const TaskController = class TaskController {
  static createTask(req, res) {
    res.render("tasks/create");
  };
};

export default TaskController;
