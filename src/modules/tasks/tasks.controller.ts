import { Request, Response } from "express";
import {getAllTasks, getTaskById, createTask, updateTask, toggleTask, deleteTask} from "./tasks.service";


export const getTasks = (req: Request, res: Response) => {
  let tasks = getAllTasks();

  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";

    tasks = tasks.filter((task) => task.completed === completed);
  }

  if (req.query.search) {
    const search = String(req.query.search).toLowerCase();

    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(search)
    );
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || tasks.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  tasks = tasks.slice(start, end);

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
  res.status(200).json(task);
};


export const addTask = (req: Request, res: Response) => {
  const { title, attachmentPath } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  const task = createTask(
    title,
    attachmentPath ?? null
  );
  res.status(201).json(task);
};


export const editTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed, attachmentPath } = req.body;
  if (title === "") {
    return res.status(400).json({
      message: "Title cannot be empty",
    });
  }
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


export const toggleTaskStatus = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = toggleTask(id);
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