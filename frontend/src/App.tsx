import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import TodoDetails from "./pages/TodoDetails";
import ViewAll from "./pages/ViewAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="/todo/:id" element={<TodoDetails />} />
        <Route path="/view-all" element={<ViewAll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
