import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./TodoDetails.css";

const AddTodo = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await api.post("/todos", { title, description });
    navigate("/");
  };

  return (
    <div className="page">
      <h1 className="title">
        TODO <span>LIST</span>
      </h1>

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

        <button className="update-btn" onClick={handleSubmit}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
