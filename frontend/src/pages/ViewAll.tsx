import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Todo } from "../types/Todo";
import TodoCard from "../components/TodoCard";
import "./ViewAll.css";

const ViewAll = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/todos").then(res => setTodos(res.data));
  }, []);

  return (
    <div className="page">
      <h1 className="title">
        TODO <span>LIST</span>
      </h1>

      <div className="grid">
        {todos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
<p className="back-link" onClick={() => navigate("/")}>
  ← Back
</p>

    </div>
  );
};

export default ViewAll;
