import { Request, Response } from "express";
import {getAllTasks, getTaskById, createTask, updateTask, deleteTask} from "./tasks.service";


export const getTasks = (req: Request, res: Response) => {
  const tasks = getAllTasks();

  res.status(200).json(tasks);
};

export const getTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = getTaskById(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.attachmentPath) {
    const attachmentUrl =
      `${req.protocol}://${req.get("host")}/files/${task.attachmentPath}`;

    return res.status(200).json({
      ...task,
      attachmentUrl,
    });
  }

  res.status(200).json(task);
};

export const addTask = (req: Request, res: Response) => {
  const { title, attachmentPath } = req.body;

  const task = createTask(title, attachmentPath);

  res.status(201).json(task);
};

export const editTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const { title, completed, attachmentPath } = req.body;

  const task = updateTask(
    id,
    title,
    completed,
    attachmentPath
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
};

export const removeTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = deleteTask(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
};