import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import type { Todo } from "../types/Todo";
import "./TodoDetails.css";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    api.get(`/todos/${id}`).then(res => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCompleted(res.data.completed);
    });
  }, [id]);

  const handleUpdate = async () => {
    await api.put(`/todos/${id}`, {
      title,
      description,
      completed,
    });
    navigate("/");
  };

  const handleDelete = async () => {
    await api.delete(`/todos/${id}`);
    navigate("/");
  };

  return (
    <div className="page">
      <h1 className="title">
        TODO <span>LIST</span>
      </h1>

      <div className="form-row">
        {/* FINISH BUTTON */}
        <div
          className={`finish-btn ${completed ? "done" : ""}`}
          onClick={() => setCompleted(!completed)}
        >
  
          <span>FINISH</span>
        </div>

        <div className="form">
          <label>TITLE</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <label>DESCRIPTION</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button className="update-btn" onClick={handleUpdate}>
            UPDATE
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
