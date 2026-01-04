import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import TodoCard from "../components/TodoCard";
import "./Home.css";
import type { Todo } from "../types/Todo";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/todos").then(res => {
      if (Array.isArray(res.data)) {
        setTodos(res.data);
      }
    });
  }, []);

  return (
    <div className="page">
      <h1 className="title">
        TODO <span>LIST</span>
      </h1>

      <div className="todo-list">
        {todos.slice(0, 4).map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

     <p className="view-all" onClick={() => navigate("/view-all")}>
  View All
</p>


      <button className="add-btn" onClick={() => navigate("/add")}>
        Add Todo ✏️
      </button>
    </div>
  );
};

export default Home;
