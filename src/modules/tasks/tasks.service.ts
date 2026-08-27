import fs from "fs";
import path from "path";
import { Task } from "../../types/types";



const filePath = path.join(__dirname, "../../data/tasks.json");


const readTasks = (): Task[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};


const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
};


export const getAllTasks = () => {
  return readTasks();
};


export const getTaskById = (id: number) => {
  const tasks = readTasks();
  return tasks.find((task) => task.id === id);
};


export const createTask = (title: string, attachmentPath: string | null) => {
  const tasks = readTasks();
  const task: Task = {
    id: tasks.length + 1,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    attachmentPath,
  };
  tasks.push(task);
  saveTasks(tasks);
  return task;
};


export const updateTask = (id: number, title?: string, completed?: boolean, attachmentPath?: string | null) => {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return undefined;
  }
  if (title !== undefined) {
    task.title = title;
  }
  if (completed !== undefined) {
    task.completed = completed;
  }
  if (attachmentPath !== undefined) {
    task.attachmentPath = attachmentPath;
  }
  saveTasks(tasks);
  return task;
};


export const toggleTask = (id: number) => {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return undefined;
  }
  task.completed = !task.completed;
  saveTasks(tasks);
  return task;
};


export const deleteTask = (id: number) => {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return undefined;
  }
  const deletedTask = tasks.splice(index, 1)[0];
  saveTasks(tasks);
  return deletedTask;
};