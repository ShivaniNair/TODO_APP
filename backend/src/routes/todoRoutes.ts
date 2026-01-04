import { Router } from "express";
import {
  getAllTodos,
  getTodo,
  addTodo,
  editTodo,
  removeTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", addTodo);
router.put("/:id", editTodo);
router.delete("/:id", removeTodo);

export default router;
