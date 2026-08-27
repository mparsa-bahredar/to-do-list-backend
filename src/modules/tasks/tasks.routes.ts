import { Router } from "express";
import {getTasks, getTask, addTask, editTask, toggleTaskStatus, removeTask} from "./tasks.controller";


const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);

router.post("/", addTask);

router.put("/:id", editTask);
router.patch("/:id", editTask);

router.patch("/:id/toggle", toggleTaskStatus);

router.delete("/:id", removeTask);

export default router;