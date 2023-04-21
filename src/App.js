import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import TaskForm from "./Components/TaskForm";
import DashBoard from "./Pages/DashBoard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/:userName" element={<DashBoard />} />
          <Route path="/:userName/createTask" element={<TaskForm />} />
          <Route path="/:userName/updateTask" element={<TaskForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
