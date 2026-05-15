import { Router } from "express";
import { Goal } from "../models/Goal";

const router = Router();

router.get("/getGoals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    req.log.error({ err }, "Error fetching goals");
    res.status(500).json({ error: "Error al obtener las metas" });
  }
});

router.post("/addGoal", async (req, res) => {
  try {
    const { title, description, targetDate, achieved } = req.body as {
      title: string;
      description?: string;
      targetDate?: string;
      achieved?: boolean;
    };

    if (!title) {
      res.status(400).json({ error: "El campo 'title' es requerido" });
      return;
    }

    const goal = new Goal({ title, description, targetDate, achieved });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    req.log.error({ err }, "Error adding goal");
    res.status(500).json({ error: "Error al agregar la meta" });
  }
});

router.delete("/removeGoal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Goal.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ error: "Meta no encontrada" });
      return;
    }

    res.json({ message: "Meta eliminada correctamente", goal: deleted });
  } catch (err) {
    req.log.error({ err }, "Error removing goal");
    res.status(500).json({ error: "Error al eliminar la meta" });
  }
});

export default router;
