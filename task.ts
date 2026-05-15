import { Router } from "express";
import { Task } from "../models/Task";

const router = Router();

router.get("/getTasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    req.log.error({ err }, "Error fetching tasks");
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

router.post("/addTask", async (req, res) => {
  try {
    const { title, description, completed } = req.body as {
      title: string;
      description?: string;
      completed?: boolean;
    };

    if (!title) {
      res.status(400).json({ error: "El campo 'title' es requerido" });
      return;
    }

    const task = new Task({ title, description, completed });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    req.log.error({ err }, "Error adding task");
    res.status(500).json({ error: "Error al agregar la tarea" });
  }
});

router.delete("/removeTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }

    res.json({ message: "Tarea eliminada correctamente", task: deleted });
  } catch (err) {
    req.log.error({ err }, "Error removing task");
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

export default router;
