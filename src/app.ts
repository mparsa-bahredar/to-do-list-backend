import express from "express";
import path from "path";
import taskRoutes from "./modules/tasks/tasks.routes";

const app = express();

app.use(express.json());

app.use("/files", express.static(path.join(__dirname, "../uploads")));

app.use("/api/tasks", taskRoutes);

export default app;