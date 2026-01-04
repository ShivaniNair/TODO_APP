import { Request, Response } from "express";
import * as TodoModel from "../models/todoModel";

// GET ALL
export const getAllTodos = async (_req: Request, res: Response) => {
  const todos = await TodoModel.getTodos();
  res.json(todos);
};

// GET ONE
export const getTodo = async (req: Request, res: Response) => {
  const todo = await TodoModel.getTodoById(Number(req.params.id));
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
};

// CREATE
export const addTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const todo = await TodoModel.createTodo(title, description);
  res.status(201).json(todo);
};

// UPDATE
export const editTodo = async (req: Request, res: Response) => {
  const success = await TodoModel.updateTodo(
    Number(req.params.id),
    req.body
  );

  if (!success) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Updated successfully" });
};

// DELETE
export const removeTodo = async (req: Request, res: Response) => {
  const success = await TodoModel.deleteTodo(Number(req.params.id));

  if (!success) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
};
