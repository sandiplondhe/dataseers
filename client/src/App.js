import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <h2>
        <a href="/">Task Manager</a>
      </h2>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/alltask" element={<ShowTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
