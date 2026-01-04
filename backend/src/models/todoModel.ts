import { db } from "../config/db";
import { Todo } from "../types/todo";

/**
 * GET ALL TODOS
 */
export const getTodos = async () => {
  const [rows] = await db.query(
    "SELECT id, title, description, completed, created_at, updated_at FROM todos ORDER BY id DESC"
  );

  return rows as Todo[];
};

/**
 * GET TODO BY ID
 */
export const getTodoById = async (id: number)=> {
  const [rows] = await db.query(
    "SELECT id, title, description, completed, created_at, updated_at FROM todos WHERE id = ?",
    [id]
  );

  const result = rows as Todo[];

  const [todo] = result;

  return todo ?? null;
};


/**
 * CREATE TODO
 */
export const createTodo = async (
  title: string,
  description: string
)=> {
  const [result] = await db.query<any>(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description]
  );

  return {
    id: result.insertId,
    title,
    description,
    completed: false,
  };
};

/**
 * UPDATE TODO
 * (Only update fields that are provided)
 */
export const updateTodo = async (
  id: number,
  data: Partial<Todo>
) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.title !== undefined) {
    fields.push("title = ?");
    values.push(data.title);
  }

  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }

  if (data.completed !== undefined) {
    fields.push("completed = ?");
    values.push(data.completed);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id);

  const [result] = await db.query<any>(
    `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return result.affectedRows > 0;
};

/**
 * DELETE TODO
 */
export const deleteTodo = async (id: number) => {
  const [result] = await db.query<any>(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
};
