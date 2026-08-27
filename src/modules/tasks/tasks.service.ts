import { Task } from "../../types/types";


const tasks: Task[] = [];

export const getAllTasks = () => {
  return tasks;
};

export const getTaskById = (id: number) => {
  return tasks.find((task) => task.id === id);
};

export const createTask = (
  title: string,
  attachmentPath?: string
) => {
  const task: Task = {
    id: tasks.length + 1,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    attachmentPath: attachmentPath ?? null,
  };

  tasks.push(task);

  return task;
};

export const updateTask = (
  id: number,
  title?: string,
  completed?: boolean,
  attachmentPath?: string
) => {
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

  return task;
};

export const deleteTask = (id: number) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return undefined;
  }

  return tasks.splice(index, 1)[0];
};