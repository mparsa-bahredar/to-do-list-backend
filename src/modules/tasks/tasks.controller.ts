import { Request, Response, NextFunction } from "express";
import { getAllTasks, getTaskById, createTask, updateTask, toggleTask, deleteTask } from "./tasks.service";



export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    let tasks = getAllTasks();
    if (req.query.completed !== undefined) {
      const completed = req.query.completed === "true";
      tasks = tasks.filter((task) => task.completed === completed);
    }
    if (req.query.search) {
      const search = String(req.query.search).toLowerCase();
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || tasks.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    tasks = tasks.slice(start, end);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const task = getTaskById(id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const addTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, attachmentPath } = req.body;
    const task = createTask(title, attachmentPath ?? null);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const editTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { title, completed, attachmentPath } = req.body;
    const task = updateTask(id, title, completed, attachmentPath);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const toggleTaskStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const task = toggleTask(id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const removeTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const task = deleteTask(id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};