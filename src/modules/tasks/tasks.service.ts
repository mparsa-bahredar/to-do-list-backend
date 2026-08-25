import { Task } from '../../types/types';
import fs from 'fs';
import path from 'path';


export let tasks: Task[] = [];
export let nextId = 1;
export const getNextId = () => nextId++;


const dataPath = path.join(__dirname, '../data/tasks.json');


export const loadTasks = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    const parsed = JSON.parse(data);
    tasks = parsed.tasks || [];
    nextId = parsed.nextId || 1;
  } catch (error) {
    tasks = [];
    nextId = 1;
  }
};

export const saveTasks = () => {
  const data = JSON.stringify({ tasks, nextId }, null, 2);
  fs.writeFileSync(dataPath, data, 'utf-8');
};