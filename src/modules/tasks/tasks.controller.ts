import { Request, Response } from 'express';
import { Task } from '../../types/types';
import { tasks, nextId, saveTasks, getNextId } from './tasks.service';


export const getAll = (req: Request, res: Response) => {
    let result = tasks;
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        result = result.filter(t => t.completed === completed);
    }
    if (req.query.search) {
        const keyword = (req.query.search as string).toLowerCase();
        result = result.filter(t => t.title.toLowerCase().includes(keyword));
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    result = result.slice(start, end);
    res.json(result);
};


export const getOne = (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id as string));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};


export const create = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask: Task = {
        id: getNextId(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        attachmentPath: null
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
};


export const update = (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id as string));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    saveTasks();
    res.json(task);
};


export const remove = (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id as string));
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    saveTasks();
    res.status(204).send();
};


export const toggle = (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id as string));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = !task.completed;
    saveTasks();
    res.json(task);
};