import { useNavigate } from "react-router-dom";
import type { Todo } from "../types/Todo";
import "./TodoCard.css";

type Props = {
  todo: Todo;
};

const TodoCard = ({ todo }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="todo-card">
      <div className={`status ${todo.completed ? "done" : ""}`}>
        ✓
      </div>

      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>

      <button
        className="view-btn"
        onClick={() => navigate(`/todo/${todo.id}`)}
      >
        VIEW
      </button>
    </div>
  );
};

export default TodoCard;
