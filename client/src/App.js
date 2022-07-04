import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="App">
      <h2>Task Manager</h2>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
