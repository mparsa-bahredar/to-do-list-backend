import { Router } from "express";
import { getTasks, getTask, addTask, editTask, toggleTaskStatus, removeTask } from "./tasks.controller";
import { validateAddTask, validateEditTask, validateGetTask, validateGetTasks, validateToggleTask, validateRemoveTask } from 
"../../middleware/validator";

const router = Router();

router.get("/", validateGetTasks, getTasks);
router.get("/:id", validateGetTask, getTask);

router.post("/", validateAddTask, addTask);

router.put("/:id", validateEditTask, editTask);
router.patch("/:id", validateEditTask, editTask);
router.patch("/:id/toggle", validateToggleTask, toggleTaskStatus);

router.delete("/:id", validateRemoveTask, removeTask);

export default router;