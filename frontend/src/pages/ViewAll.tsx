import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Todo } from "../types/Todo";
import TodoCard from "../components/TodoCard";
import "./ViewAll.css";

type StatusFilter = "all" | "completed" | "pending";
type SortOption = "name" | "status";

const ViewAll = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
   const navigate = useNavigate();

  useEffect(() => {
    api.get("/todos").then(res => setTodos(res.data));
  }, []);

  //  FILTER + SORT LOGIC
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Search by title
    if (search.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter === "completed") {
      result = result.filter(todo => todo.completed);
    } else if (statusFilter === "pending") {
      result = result.filter(todo => !todo.completed);
    }

    // Sort
    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "status") {
      result.sort((a, b) => Number(a.completed) - Number(b.completed));
    }

    return result;
  }, [todos, search, statusFilter, sortBy]);

  return (
    <div className="page">
      <h1 className="title">
        TODO <span>LIST</span>
      </h1>

      {/* CONTROLS */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Not Completed</option>
        </select>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortOption)}
        >
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <div className="grid">
        {filteredTodos.length === 0 && (
          <p style={{ textAlign: "center" }}>No tasks found</p>
        )}

        {filteredTodos.map(todo => (
          <TodoCard key={todo.id} todo={todo} home={false}/>
        ))}
      </div>
      <p className="back-link" onClick={() => navigate("/")}>
  ← Back
</p>
    </div>
  );
};

export default ViewAll;
